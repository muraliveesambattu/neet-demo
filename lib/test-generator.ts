import { prisma } from "./db";
import type { Subject, Difficulty } from "@prisma/client";
import {
  QUESTIONS_PER_SUBJECT,
  SUBJECTS,
  DIFFICULTY_RATIO,
} from "./constants";

function fisherYatesShuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sampleN<T>(arr: T[], n: number): T[] {
  return fisherYatesShuffle(arr).slice(0, n);
}

export type DifficultyMode = "easy" | "default" | "hard";

export async function generateTestQuestions(
  userId: string,
  mode: "full" | "adaptive" | "subject" = "full",
  targetSubject?: Subject,
  difficultyMode: DifficultyMode = "default"
): Promise<string[]> {
  // 1. Get all question IDs the user has already seen
  const seenAnswers = await prisma.attemptAnswer.findMany({
    where: { attempt: { userId } },
    select: { questionId: true },
  });
  const seenIds = new Set(seenAnswers.map((a) => a.questionId));

  const subjects: Subject[] = targetSubject
    ? [targetSubject]
    : (SUBJECTS as unknown as Subject[]);

  const questionsPerSubject =
    targetSubject ? QUESTIONS_PER_SUBJECT : QUESTIONS_PER_SUBJECT;

  const ratios = DIFFICULTY_RATIO[difficultyMode];

  const selectedIds: string[] = [];

  for (const subject of subjects) {
    // 2. Get adaptive weights for chapters if in adaptive mode
    let chapterWeights: Record<string, number> = {};
    if (mode === "adaptive") {
      const perf = await prisma.subjectPerformance.findMany({
        where: { userId, subject },
        select: { chapter: true, accuracy: true },
      });
      for (const p of perf) {
        if (p.accuracy < 40) chapterWeights[p.chapter] = 2;
        else if (p.accuracy > 70) chapterWeights[p.chapter] = 0.5;
        else chapterWeights[p.chapter] = 1;
      }
    }

    // 3. Sample by difficulty
    const difficulties: Difficulty[] = ["EASY", "MEDIUM", "HARD"];
    const counts = {
      EASY: Math.round(questionsPerSubject * ratios.EASY),
      MEDIUM: Math.round(questionsPerSubject * ratios.MEDIUM),
      HARD:
        questionsPerSubject -
        Math.round(questionsPerSubject * ratios.EASY) -
        Math.round(questionsPerSubject * ratios.MEDIUM),
    };

    let subjectIds: string[] = [];

    for (const difficulty of difficulties) {
      const needed = counts[difficulty];

      // Get unseen questions for this subject/difficulty
      const available = await prisma.question.findMany({
        where: {
          subject,
          difficulty,
          isActive: true,
          id: { notIn: [...seenIds] },
        },
        select: { id: true, chapter: true },
      });

      // If not enough unseen, fall back to oldest seen
      let pool = available;
      if (pool.length < needed) {
        const extra = await prisma.question.findMany({
          where: { subject, difficulty, isActive: true },
          select: { id: true, chapter: true },
          orderBy: { createdAt: "asc" },
          take: needed - pool.length + 20,
        });
        const extraUnseen = extra.filter(
          (q) => !subjectIds.includes(q.id) && !selectedIds.includes(q.id)
        );
        pool = [...pool, ...extraUnseen];
      }

      // Apply adaptive chapter weights
      if (mode === "adaptive" && Object.keys(chapterWeights).length > 0) {
        const weighted: typeof pool = [];
        for (const q of pool) {
          const w = chapterWeights[q.chapter] ?? 1;
          const copies = Math.round(w * 10);
          for (let i = 0; i < copies; i++) weighted.push(q);
        }
        pool = weighted;
      }

      const sampled = sampleN(pool, Math.min(needed * 3, pool.length));
      const seenInSample = new Set<string>();
      const unique = sampled.filter((q) => {
        if (seenInSample.has(q.id)) return false;
        if (subjectIds.includes(q.id) || selectedIds.includes(q.id)) return false;
        seenInSample.add(q.id);
        return true;
      });
      subjectIds.push(...unique.map((q) => q.id).slice(0, needed));
    }

    selectedIds.push(...subjectIds);
  }

  // Final dedup safety net — should never be needed but prevents unique constraint failures
  const dedupedIds = [...new Set(selectedIds)];
  return fisherYatesShuffle(dedupedIds);
}
