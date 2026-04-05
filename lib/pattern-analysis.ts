import { prisma } from "./db";
import type { Subject } from "@prisma/client";

export interface ChapterFrequency {
  chapter: string;
  subject: Subject;
  totalQuestions: number;
  byYear: Record<number, number>;
}

export async function getChapterFrequencies(
  subject?: Subject
): Promise<ChapterFrequency[]> {
  const where = subject ? { subject, isActive: true } : { isActive: true };

  const questions = await prisma.question.findMany({
    where,
    select: { subject: true, chapter: true, year: true },
  });

  const map = new Map<string, ChapterFrequency>();

  for (const q of questions) {
    const key = `${q.subject}:${q.chapter}`;
    if (!map.has(key)) {
      map.set(key, {
        chapter: q.chapter,
        subject: q.subject,
        totalQuestions: 0,
        byYear: {},
      });
    }
    const entry = map.get(key)!;
    entry.totalQuestions++;
    if (q.year) {
      entry.byYear[q.year] = (entry.byYear[q.year] ?? 0) + 1;
    }
  }

  return [...map.values()].sort((a, b) => b.totalQuestions - a.totalQuestions);
}
