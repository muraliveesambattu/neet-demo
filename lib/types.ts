import type { Subject, Difficulty, AttemptStatus, Role } from "@prisma/client";

export type { Subject, Difficulty, AttemptStatus, Role };

export interface QuestionForTest {
  id: string;
  subject: Subject;
  chapter: string;
  concept: string;
  year: number | null;
  difficulty: Difficulty;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  // correctOption intentionally omitted during active test
}

export interface QuestionForReview extends QuestionForTest {
  correctOption: string;
  explanation: string | null;
}

export interface AnswerState {
  questionId: string;
  selectedOption: string | null;
  markedForReview: boolean;
  score: number;
  isCorrect: boolean | null;
}

export interface ScoreBreakdownData {
  subject: Subject;
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  score: number;
  accuracy: number;
}

export interface AttemptSummary {
  id: string;
  startedAt: Date;
  submittedAt: Date | null;
  totalScore: number | null;
  maxScore: number;
  timeTakenSecs: number | null;
  status: AttemptStatus;
  scoreBreakdown: ScoreBreakdownData[];
}

export interface DashboardStats {
  totalAttempts: number;
  averageScore: number;
  bestScore: number;
  recentAttempts: AttemptSummary[];
  subjectPerformance: {
    subject: Subject;
    accuracy: number;
    totalAttempted: number;
  }[];
}

export interface WeakChapter {
  subject: Subject;
  chapter: string;
  accuracy: number;
  totalAttempted: number;
}

export interface AdaptiveRecommendation {
  weakChapters: WeakChapter[];
  overallAccuracy: number;
  suggestedDifficultyMode: "easy" | "default" | "hard";
}

export interface TestGenerateRequest {
  mode: "full" | "adaptive" | "subject";
  subject?: Subject;
}

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: Role;
}
