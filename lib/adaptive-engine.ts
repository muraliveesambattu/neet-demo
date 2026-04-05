import { prisma } from "./db";
import type { Subject } from "@prisma/client";
import type { AdaptiveRecommendation, WeakChapter } from "./types";

export async function getAdaptiveRecommendation(
  userId: string
): Promise<AdaptiveRecommendation> {
  const performance = await prisma.subjectPerformance.findMany({
    where: { userId },
    orderBy: { accuracy: "asc" },
  });

  const weakChapters: WeakChapter[] = performance
    .filter((p) => p.accuracy < 50 && p.totalAttempted >= 5)
    .slice(0, 10)
    .map((p) => ({
      subject: p.subject,
      chapter: p.chapter,
      accuracy: p.accuracy,
      totalAttempted: p.totalAttempted,
    }));

  const totalAttempted = performance.reduce(
    (sum, p) => sum + p.totalAttempted,
    0
  );
  const totalCorrect = performance.reduce(
    (sum, p) => sum + p.totalCorrect,
    0
  );
  const overallAccuracy =
    totalAttempted > 0 ? (totalCorrect / totalAttempted) * 100 : 0;

  let suggestedDifficultyMode: "easy" | "default" | "hard" = "default";
  if (overallAccuracy < 50) suggestedDifficultyMode = "easy";
  else if (overallAccuracy > 70) suggestedDifficultyMode = "hard";

  return { weakChapters, overallAccuracy, suggestedDifficultyMode };
}

export async function updateSubjectPerformance(
  userId: string,
  results: {
    subject: Subject;
    chapter: string;
    attempted: number;
    correct: number;
  }[]
) {
  await Promise.all(
    results.map(async ({ subject, chapter, attempted, correct }) => {
      const existing = await prisma.subjectPerformance.findUnique({
        where: { userId_subject_chapter: { userId, subject, chapter } },
      });

      const newAttempted = (existing?.totalAttempted ?? 0) + attempted;
      const newCorrect = (existing?.totalCorrect ?? 0) + correct;
      const newAccuracy =
        newAttempted > 0 ? (newCorrect / newAttempted) * 100 : 0;

      await prisma.subjectPerformance.upsert({
        where: { userId_subject_chapter: { userId, subject, chapter } },
        create: {
          userId,
          subject,
          chapter,
          totalAttempted: newAttempted,
          totalCorrect: newCorrect,
          accuracy: newAccuracy,
        },
        update: {
          totalAttempted: newAttempted,
          totalCorrect: newCorrect,
          accuracy: newAccuracy,
        },
      });
    })
  );
}
