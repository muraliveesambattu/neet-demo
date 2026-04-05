"use client";

interface PaletteProps {
  total: number;
  current: number;
  answers: Record<string, string | null>; // questionId -> selectedOption
  markedForReview: Record<string, boolean>;
  questionIds: string[];
  onJump: (index: number) => void;
}

export function QuestionPalette({
  total,
  current,
  answers,
  markedForReview,
  questionIds,
  onJump,
}: PaletteProps) {
  return (
    <div>
      <div className="text-xs font-medium text-gray-500 mb-3 flex gap-4 flex-wrap">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm bg-green-500 inline-block" /> Answered
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm bg-purple-500 inline-block" /> Marked
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm bg-gray-200 inline-block" /> Not attempted
        </span>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: total }).map((_, i) => {
          const qId = questionIds[i];
          const answered = qId && answers[qId] != null && answers[qId] !== "";
          const marked = qId && markedForReview[qId];
          const isCurrent = i === current;

          let cls =
            "w-7 h-7 rounded text-xs font-medium flex items-center justify-center cursor-pointer transition-colors ";
          if (isCurrent) cls += "ring-2 ring-blue-500 ring-offset-1 ";
          if (marked) cls += "bg-purple-500 text-white ";
          else if (answered) cls += "bg-green-500 text-white ";
          else cls += "bg-gray-100 text-gray-600 hover:bg-gray-200 ";

          return (
            <button key={i} className={cls} onClick={() => onJump(i)}>
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
