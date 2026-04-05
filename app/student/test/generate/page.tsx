"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Mode = "full" | "adaptive" | "subject";
type Subject = "PHYSICS" | "CHEMISTRY" | "BOTANY" | "ZOOLOGY";

export default function GenerateTestPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("full");
  const [subject, setSubject] = useState<Subject>("PHYSICS");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleStart() {
    setError("");
    setLoading(true);
    const res = await fetch("/api/tests/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode, subject: mode === "subject" ? subject : undefined }),
    });
    setLoading(false);
    if (!res.ok) {
      const d = await res.json();
      setError(d.error ?? "Failed to generate test");
      return;
    }
    const { attemptId } = await res.json();
    router.push(`/student/test/${attemptId}`);
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Start a New Test</h1>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        {/* Mode Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Test Mode
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: "full", label: "Full Test", desc: "180 questions, all subjects" },
              { value: "adaptive", label: "Adaptive", desc: "Focus on your weak areas" },
              { value: "subject", label: "Subject", desc: "45 questions, one subject" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setMode(opt.value as Mode)}
                className={`p-3 rounded-lg border-2 text-left transition-colors ${
                  mode === opt.value
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="font-medium text-sm">{opt.label}</div>
                <div className="text-xs text-gray-500 mt-0.5">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Subject Selection (only for subject mode) */}
        {mode === "subject" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Subject
            </label>
            <div className="grid grid-cols-2 gap-3">
              {(["PHYSICS", "CHEMISTRY", "BOTANY", "ZOOLOGY"] as Subject[]).map(
                (s) => (
                  <button
                    key={s}
                    onClick={() => setSubject(s)}
                    className={`p-3 rounded-lg border-2 text-left transition-colors ${
                      subject === s
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-medium text-sm capitalize">
                      {s.charAt(0) + s.slice(1).toLowerCase()}
                    </div>
                    <div className="text-xs text-gray-500">45 questions</div>
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Test info */}
        <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600 space-y-1">
          <div>Questions: {mode === "subject" ? 45 : 180}</div>
          <div>Duration: {mode === "subject" ? "50 min" : "3h 20min"}</div>
          <div>Marking: +4 correct, −1 incorrect, 0 unattempted</div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleStart}
          disabled={loading}
          className="w-full bg-blue-600 text-white rounded-lg py-3 font-medium hover:bg-blue-700 disabled:opacity-60 transition-colors"
        >
          {loading ? "Generating test..." : "Start Test"}
        </button>
      </div>
    </div>
  );
}
