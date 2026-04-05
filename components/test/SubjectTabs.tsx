"use client";

import { SUBJECT_COLORS, SUBJECT_LABELS } from "@/lib/constants";
import type { Subject } from "@prisma/client";

interface SubjectTabsProps {
  subjects: Subject[];
  activeSubject: Subject | null;
  onSelect: (subject: Subject | null) => void;
  answeredCounts: Record<Subject, number>;
  totalCounts: Record<Subject, number>;
}

export function SubjectTabs({
  subjects,
  activeSubject,
  onSelect,
  answeredCounts,
  totalCounts,
}: SubjectTabsProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      <button
        onClick={() => onSelect(null)}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
          activeSubject === null
            ? "bg-gray-900 text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        All
      </button>
      {subjects.map((s) => {
        const active = activeSubject === s;
        const color = SUBJECT_COLORS[s];
        return (
          <button
            key={s}
            onClick={() => onSelect(s)}
            style={active ? { backgroundColor: color, color: "#fff" } : undefined}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              active ? "" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {SUBJECT_LABELS[s]}
            <span className="ml-1.5 text-xs opacity-75">
              {answeredCounts[s] ?? 0}/{totalCounts[s] ?? 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}
