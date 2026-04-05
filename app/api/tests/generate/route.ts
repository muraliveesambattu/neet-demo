import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { generateTestQuestions } from "@/lib/test-generator";
import { getAdaptiveRecommendation } from "@/lib/adaptive-engine";

const schema = z.object({
  mode: z.enum(["full", "adaptive", "subject"]).default("full"),
  subject: z.enum(["PHYSICS", "CHEMISTRY", "BOTANY", "ZOOLOGY"]).optional(),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { mode, subject } = schema.parse(body);

    let difficultyMode: "easy" | "default" | "hard" = "default";
    if (mode === "adaptive") {
      const rec = await getAdaptiveRecommendation(session.user.id);
      difficultyMode = rec.suggestedDifficultyMode;
    }

    const questionIds = await generateTestQuestions(
      session.user.id,
      mode,
      subject,
      difficultyMode
    );

    if (questionIds.length < 45) {
      return NextResponse.json(
        { error: "Not enough questions available. Please contact admin." },
        { status: 422 }
      );
    }

    // Create attempt + pre-populate all answer rows
    const attempt = await prisma.testAttempt.create({
      data: {
        userId: session.user.id,
        answers: {
          createMany: {
            data: questionIds.map((questionId) => ({ questionId })),
          },
        },
      },
    });

    // Fetch question details (no correctOption or explanation)
    const questions = await prisma.question.findMany({
      where: { id: { in: questionIds } },
      select: {
        id: true, subject: true, chapter: true, concept: true,
        year: true, difficulty: true, questionText: true,
        optionA: true, optionB: true, optionC: true, optionD: true,
      },
    });

    // Preserve the shuffled order
    const ordered = questionIds
      .map((id) => questions.find((q) => q.id === id))
      .filter(Boolean);

    return NextResponse.json({ attemptId: attempt.id, questions: ordered }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
