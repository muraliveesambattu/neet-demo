"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SUBJECT_COLORS, SUBJECT_LABELS } from "@/lib/constants";
import type { Subject } from "@prisma/client";

interface SubjectPerf {
  subject: Subject;
  accuracy: number;
  totalAttempted: number;
}

interface DashboardData {
  totalAttempts: number;
  averageScore: number;
  bestScore: number;
  subjectPerformance: SubjectPerf[];
  recentAttempts: {
    id: string;
    startedAt: string;
    totalScore: number | null;
    maxScore: number;
    status: string;
    scoreBreakdown: { subject: Subject; correct: number; score: number }[];
  }[];
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then(setData);
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link
          href="/student/test/generate"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          Start New Test
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Tests Taken" value={data.totalAttempts} />
        <StatCard label="Avg Score" value={`${data.averageScore}/720`} />
        <StatCard label="Best Score" value={`${data.bestScore}/720`} />
      </div>

      {/* Subject Performance */}
      {data.subjectPerformance.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-lg mb-4">Subject Accuracy</h2>
          <div className="space-y-3">
            {data.subjectPerformance.map((p) => (
              <div key={p.subject}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium">{SUBJECT_LABELS[p.subject]}</span>
                  <span className="text-gray-500">{p.accuracy}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${p.accuracy}%`,
                      backgroundColor: SUBJECT_COLORS[p.subject],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Attempts */}
      {data.recentAttempts.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-lg mb-4">Recent Tests</h2>
          <div className="space-y-3">
            {data.recentAttempts.map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <div className="text-sm font-medium">
                    Score: {a.totalScore ?? "—"}/{a.maxScore}
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(a.startedAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/student/test/${a.id}/review`}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Review
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.totalAttempts === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-400 mb-4">No tests taken yet.</p>
          <Link
            href="/student/test/generate"
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            Take Your First Test
          </Link>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
    </div>
  );
}
