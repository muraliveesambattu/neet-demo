"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SUBJECT_LABELS, SUBJECT_COLORS } from "@/lib/constants";
import type { Subject } from "@prisma/client";

interface Attempt {
  id: string;
  startedAt: string;
  submittedAt: string | null;
  totalScore: number | null;
  maxScore: number;
  timeTakenSecs: number | null;
  status: string;
  scoreBreakdown: {
    subject: Subject;
    correct: number;
    incorrect: number;
    score: number;
    accuracy: number;
    totalQuestions: number;
  }[];
}

export default function HistoryPage() {
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then((d) => {
        setAttempts(d.recentAttempts ?? []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-gray-400">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Test History</h1>
        <Link
          href="/student/test/generate"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          New Test
        </Link>
      </div>

      {attempts.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400">
          No tests taken yet.
        </div>
      )}

      {attempts.map((a) => (
        <div key={a.id} className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-2xl font-bold">
                {a.totalScore ?? "—"}{" "}
                <span className="text-base font-normal text-gray-400">/ {a.maxScore}</span>
              </div>
              <div className="text-sm text-gray-400 mt-0.5">
                {new Date(a.startedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
                {a.timeTakenSecs && (
                  <> &middot; {Math.floor(a.timeTakenSecs / 60)} min</>
                )}
              </div>
            </div>
            <Link
              href={`/student/test/${a.id}/review`}
              className="text-sm text-blue-600 hover:underline"
            >
              Review
            </Link>
          </div>

          {a.scoreBreakdown.length > 0 && (
            <div className="grid grid-cols-4 gap-2 mt-4">
              {a.scoreBreakdown.map((b) => (
                <div key={b.subject} className="text-center">
                  <div
                    className="text-xs font-semibold"
                    style={{ color: SUBJECT_COLORS[b.subject] }}
                  >
                    {SUBJECT_LABELS[b.subject].slice(0, 4)}
                  </div>
                  <div className="font-bold">{b.score}</div>
                  <div className="text-xs text-gray-400">{Math.round(b.accuracy)}%</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
