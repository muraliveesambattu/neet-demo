export function computeQuestionScore(
  selectedOption: string | null,
  correctOption: string
): { score: number; isCorrect: boolean | null } {
  if (selectedOption === null) return { score: 0, isCorrect: null };
  if (selectedOption === correctOption) return { score: 4, isCorrect: true };
  return { score: -1, isCorrect: false };
}

export function formatScore(score: number, maxScore: number): string {
  return `${score}/${maxScore}`;
}

export function formatAccuracy(correct: number, attempted: number): string {
  if (attempted === 0) return "0%";
  return `${Math.round((correct / attempted) * 100)}%`;
}

export function getScorePercentage(score: number, maxScore: number): number {
  return Math.round((score / maxScore) * 100);
}
