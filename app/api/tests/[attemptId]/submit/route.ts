import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { computeQuestionScore } from "@/lib/scoring";
import { updateSubjectPerformance } from "@/lib/adaptive-engine";
import type { Subject } from "@prisma/client";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ attemptId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { attemptId } = await params;

  const attempt = await prisma.testAttempt.findUnique({
    where: { id: attemptId },
    include: {
      answers: {
        include: {
          question: {
            select: {
              correctOption: true, subject: true, chapter: true,
            },
          },
        },
      },
    },
  });

  if (!attempt) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (attempt.userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (attempt.status !== "IN_PROGRESS") {
    return NextResponse.json({ error: "Already submitted" }, { status: 409 });
  }

  // Compute scores for all answers
  const scoredAnswers = attempt.answers.map((a) => {
    const { score, isCorrect } = computeQuestionScore(
      a.selectedOption,
      a.question.correctOption
    );
    return {
      id: a.id,
      score,
      isCorrect,
      subject: a.question.subject,
      chapter: a.question.chapter,
      selectedOption: a.selectedOption,
    };
  });

  const totalScore = scoredAnswers.reduce((sum, a) => sum + a.score, 0);

  // Build per-subject breakdown
  const subjects: Subject[] = ["PHYSICS", "CHEMISTRY", "BOTANY", "ZOOLOGY"];
  const breakdown = subjects.map((subject) => {
    const subjectAnswers = scoredAnswers.filter((a) => a.subject === subject);
    const attempted = subjectAnswers.filter((a) => a.selectedOption !== null).length;
    const correct = subjectAnswers.filter((a) => a.isCorrect === true).length;
    const incorrect = subjectAnswers.filter((a) => a.isCorrect === false).length;
    const score = subjectAnswers.reduce((sum, a) => sum + a.score, 0);
    const accuracy = attempted > 0 ? (correct / attempted) * 100 : 0;
    return {
      subject,
      totalQuestions: subjectAnswers.length,
      attempted,
      correct,
      incorrect,
      score,
      accuracy,
    };
  });

  // Build chapter-level performance updates
  const chapterMap = new Map<
    string,
    { subject: Subject; chapter: string; attempted: number; correct: number }
  >();
  for (const a of scoredAnswers) {
    const key = `${a.subject}:${a.chapter}`;
    if (!chapterMap.has(key)) {
      chapterMap.set(key, { subject: a.subject, chapter: a.chapter, attempted: 0, correct: 0 });
    }
    const entry = chapterMap.get(key)!;
    if (a.selectedOption !== null) entry.attempted++;
    if (a.isCorrect === true) entry.correct++;
  }

  const timeTakenSecs = Math.round(
    (Date.now() - attempt.startedAt.getTime()) / 1000
  );

  // Persist everything in a transaction
  await prisma.$transaction([
    // Update all answer rows with scores/isCorrect
    ...scoredAnswers.map((a) =>
      prisma.attemptAnswer.update({
        where: { id: a.id },
        data: { score: a.score, isCorrect: a.isCorrect },
      })
    ),
    // Update attempt status
    prisma.testAttempt.update({
      where: { id: attemptId },
      data: {
        status: "SUBMITTED",
        submittedAt: new Date(),
        totalScore,
        timeTakenSecs,
      },
    }),
    // Create score breakdown rows
    prisma.scoreBreakdown.createMany({
      data: breakdown.map((b) => ({ ...b, attemptId })),
    }),
  ]);

  // Update rolling subject performance (outside transaction — upserts)
  await updateSubjectPerformance(
    session.user.id,
    [...chapterMap.values()]
  );

  return NextResponse.json({ totalScore, maxScore: attempt.maxScore, breakdown });
}
