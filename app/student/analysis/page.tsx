"use client";

import { useEffect, useState } from "react";
import { SUBJECT_LABELS, SUBJECT_COLORS } from "@/lib/constants";
import type { Subject } from "@prisma/client";

interface ChapterFreq {
  chapter: string;
  subject: Subject;
  totalQuestions: number;
}

interface AdaptiveRec {
  weakChapters: { subject: Subject; chapter: string; accuracy: number; totalAttempted: number }[];
  overallAccuracy: number;
  suggestedDifficultyMode: "easy" | "default" | "hard";
}

export default function AnalysisPage() {
  const [patterns, setPatterns] = useState<ChapterFreq[]>([]);
  const [adaptive, setAdaptive] = useState<AdaptiveRec | null>(null);
  const [subject, setSubject] = useState<Subject | "ALL">("ALL");

  useEffect(() => {
    const url =
      subject === "ALL"
        ? "/api/analysis/patterns"
        : `/api/analysis/patterns?subject=${subject}`;
    fetch(url).then((r) => r.json()).then(setPatterns);
    fetch("/api/analysis/adaptive").then((r) => r.json()).then(setAdaptive);
  }, [subject]);

  const top20 = patterns.slice(0, 20);
  const maxCount = top20[0]?.totalQuestions ?? 1;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Analysis</h1>

      {/* Adaptive recommendations */}
      {adaptive && adaptive.weakChapters.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <h2 className="font-semibold text-amber-800 mb-3">
            Focus Areas (Overall accuracy: {Math.round(adaptive.overallAccuracy)}%)
          </h2>
          <div className="space-y-2">
            {adaptive.weakChapters.slice(0, 5).map((w) => (
              <div key={`${w.subject}-${w.chapter}`} className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-800">{w.chapter}</span>
                  <span
                    className="ml-2 text-xs font-semibold"
                    style={{ color: SUBJECT_COLORS[w.subject] }}
                  >
                    {SUBJECT_LABELS[w.subject]}
                  </span>
                </div>
                <span className="text-sm font-bold text-red-600">{Math.round(w.accuracy)}%</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-amber-700 mt-3">
            Suggestion: Use <strong>Adaptive</strong> test mode to focus on these chapters.
          </p>
        </div>
      )}

      {/* Chapter frequency */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">NEET Question Frequency by Chapter</h2>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value as Subject | "ALL")}
            className="text-sm border border-gray-300 rounded-lg px-2 py-1"
          >
            <option value="ALL">All Subjects</option>
            <option value="PHYSICS">Physics</option>
            <option value="CHEMISTRY">Chemistry</option>
            <option value="BOTANY">Botany</option>
            <option value="ZOOLOGY">Zoology</option>
          </select>
        </div>

        <div className="space-y-2">
          {top20.map((c) => (
            <div key={`${c.subject}-${c.chapter}`} className="flex items-center gap-3">
              <div className="w-40 text-xs text-gray-600 truncate" title={c.chapter}>
                {c.chapter}
              </div>
              <div className="flex-1 h-5 bg-gray-100 rounded overflow-hidden">
                <div
                  className="h-full rounded transition-all"
                  style={{
                    width: `${(c.totalQuestions / maxCount) * 100}%`,
                    backgroundColor: SUBJECT_COLORS[c.subject],
                  }}
                />
              </div>
              <div className="text-xs font-medium text-gray-500 w-6 text-right">
                {c.totalQuestions}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
