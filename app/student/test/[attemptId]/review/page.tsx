"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { SUBJECT_LABELS, SUBJECT_COLORS } from "@/lib/constants";
import type { Subject } from "@prisma/client";

interface ReviewData {
  id: string;
  totalScore: number;
  maxScore: number;
  timeTakenSecs: number | null;
  scoreBreakdown: {
    subject: Subject;
    totalQuestions: number;
    attempted: number;
    correct: number;
    incorrect: number;
    score: number;
    accuracy: number;
  }[];
  answers: {
    questionId: string;
    selectedOption: string | null;
    isCorrect: boolean | null;
    score: number;
    question: {
      id: string;
      subject: Subject;
      chapter: string;
      difficulty: string;
      questionText: string;
      optionA: string;
      optionB: string;
      optionC: string;
      optionD: string;
      correctOption: string;
      explanation: string | null;
      year: number | null;
    };
  }[];
}

const OPTIONS = ["A", "B", "C", "D"] as const;
const OPT_KEYS = { A: "optionA", B: "optionB", C: "optionC", D: "optionD" } as const;

export default function ReviewPage({ params }: { params: Promise<{ attemptId: string }> }) {
  const { attemptId } = use(params);
  const [data, setData] = useState<ReviewData | null>(null);
  const [filter, setFilter] = useState<"all" | "incorrect" | "unattempted">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/tests/${attemptId}/review`)
      .then((r) => r.json())
      .then(setData);
  }, [attemptId]);

  if (!data) {
    return <div className="flex items-center justify-center h-64 text-gray-400">Loading review...</div>;
  }

  const filteredAnswers = data.answers.filter((a) => {
    if (filter === "incorrect") return a.isCorrect === false;
    if (filter === "unattempted") return a.selectedOption === null;
    return true;
  });

  const pct = Math.round((data.totalScore / data.maxScore) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Test Review</h1>
        <Link href="/student/test/generate" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
          New Test
        </Link>
      </div>

      {/* Score card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600">{data.totalScore}</div>
            <div className="text-sm text-gray-400">out of {data.maxScore}</div>
          </div>
          <div className="text-3xl font-light text-gray-300">|</div>
          <div className="text-center">
            <div className="text-2xl font-bold">{pct}%</div>
            <div className="text-sm text-gray-400">Percentile proxy</div>
          </div>
          {data.timeTakenSecs && (
            <>
              <div className="text-3xl font-light text-gray-300">|</div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {Math.floor(data.timeTakenSecs / 60)}m
                </div>
                <div className="text-sm text-gray-400">Time taken</div>
              </div>
            </>
          )}
        </div>

        {/* Subject breakdown */}
        <div className="grid grid-cols-4 gap-3 mt-6">
          {data.scoreBreakdown.map((b) => (
            <div key={b.subject} className="bg-gray-50 rounded-lg p-3">
              <div
                className="text-xs font-semibold mb-1"
                style={{ color: SUBJECT_COLORS[b.subject] }}
              >
                {SUBJECT_LABELS[b.subject]}
              </div>
              <div className="text-lg font-bold">{b.score}</div>
              <div className="text-xs text-gray-400">
                {b.correct}✓ {b.incorrect}✗ {b.totalQuestions - b.attempted}—
              </div>
              <div className="text-xs text-gray-500">{Math.round(b.accuracy)}% acc</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {(["all", "incorrect", "unattempted"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === f ? "bg-gray-900 text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
            }`}
          >
            {f === "all" ? `All (${data.answers.length})` : f === "incorrect" ? `Wrong (${data.answers.filter((a) => a.isCorrect === false).length})` : `Skipped (${data.answers.filter((a) => a.selectedOption === null).length})`}
          </button>
        ))}
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {filteredAnswers.map((a, i) => {
          const q = a.question;
          const expanded = expandedId === q.id;
          return (
            <div key={q.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div
                className="p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => setExpandedId(expanded ? null : q.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        a.isCorrect === true
                          ? "bg-green-100 text-green-700"
                          : a.isCorrect === false
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {a.isCorrect === true ? "✓" : a.isCorrect === false ? "✗" : "—"}
                    </span>
                    <span className="text-sm text-gray-700 font-medium">Q{i + 1}.</span>
                  </div>
                  <p className="text-sm text-gray-800 flex-1 line-clamp-2">{q.questionText}</p>
                  <span className="text-sm font-bold text-gray-700 flex-shrink-0">
                    {a.score > 0 ? `+${a.score}` : a.score}
                  </span>
                </div>
              </div>

              {expanded && (
                <div className="px-4 pb-4 border-t border-gray-100">
                  <p className="text-gray-800 text-sm mt-4 mb-4 leading-relaxed">{q.questionText}</p>
                  <div className="space-y-2">
                    {OPTIONS.map((opt) => {
                      const text = q[OPT_KEYS[opt] as keyof typeof q] as string;
                      const isCorrect = opt === q.correctOption;
                      const isSelected = a.selectedOption === opt;
                      return (
                        <div
                          key={opt}
                          className={`flex items-start gap-2 p-2 rounded-lg text-sm ${
                            isCorrect
                              ? "bg-green-50 border border-green-200"
                              : isSelected
                              ? "bg-red-50 border border-red-200"
                              : "border border-transparent"
                          }`}
                        >
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                            isCorrect ? "bg-green-500 text-white" : isSelected ? "bg-red-500 text-white" : "bg-gray-200 text-gray-600"
                          }`}>
                            {opt}
                          </span>
                          <span>{text}</span>
                        </div>
                      );
                    })}
                  </div>
                  {q.explanation && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
                      <span className="font-semibold">Explanation: </span>
                      {q.explanation}
                    </div>
                  )}
                  <div className="mt-2 text-xs text-gray-400">
                    {q.chapter} • {q.difficulty}{q.year ? ` • NEET ${q.year}` : ""}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
