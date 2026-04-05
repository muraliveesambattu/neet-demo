"use client";

interface QuestionCardProps {
  index: number;
  total: number;
  question: {
    id: string;
    questionText: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    subject: string;
    chapter: string;
    difficulty: string;
    year: number | null;
  };
  selectedOption: string | null;
  markedForReview: boolean;
  onSelect: (option: string) => void;
  onToggleReview: () => void;
}

const OPTIONS = ["A", "B", "C", "D"] as const;
const OPTION_KEYS = { A: "optionA", B: "optionB", C: "optionC", D: "optionD" } as const;

const DIFFICULTY_COLORS = {
  EASY: "text-green-600 bg-green-50",
  MEDIUM: "text-yellow-600 bg-yellow-50",
  HARD: "text-red-600 bg-red-50",
};

export function QuestionCard({
  index,
  total,
  question,
  selectedOption,
  markedForReview,
  onSelect,
  onToggleReview,
}: QuestionCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="font-medium">Q{index + 1}</span>
          <span>of {total}</span>
          <span className="mx-1">•</span>
          <span>{question.chapter}</span>
          {question.year && (
            <>
              <span className="mx-1">•</span>
              <span>NEET {question.year}</span>
            </>
          )}
        </div>
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            DIFFICULTY_COLORS[question.difficulty as keyof typeof DIFFICULTY_COLORS]
          }`}
        >
          {question.difficulty}
        </span>
      </div>

      {/* Question text */}
      <p className="text-gray-900 text-base leading-relaxed mb-6">
        {question.questionText}
      </p>

      {/* Options */}
      <div className="space-y-3">
        {OPTIONS.map((opt) => {
          const key = OPTION_KEYS[opt];
          const text = question[key as keyof typeof question] as string;
          const selected = selectedOption === opt;
          return (
            <button
              key={opt}
              onClick={() => onSelect(opt)}
              className={`w-full text-left flex items-start gap-3 p-3 rounded-lg border-2 transition-colors ${
                selected
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/30"
              }`}
            >
              <span
                className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                  selected
                    ? "border-blue-500 bg-blue-500 text-white"
                    : "border-gray-300 text-gray-500"
                }`}
              >
                {opt}
              </span>
              <span className="text-gray-800 text-sm leading-relaxed pt-0.5">
                {text}
              </span>
            </button>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
        <button
          onClick={onToggleReview}
          className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
            markedForReview
              ? "bg-purple-100 text-purple-700"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {markedForReview ? "Marked for Review" : "Mark for Review"}
        </button>
        {selectedOption && (
          <button
            onClick={() => onSelect("")}
            className="text-sm text-gray-400 hover:text-gray-600"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
