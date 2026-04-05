"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CHAPTERS, SUBJECTS, SUBJECT_LABELS } from "@/lib/constants";
import type { Subject } from "@prisma/client";

interface QuestionFormProps {
  initial?: {
    id?: string;
    subject?: Subject;
    chapter?: string;
    concept?: string;
    year?: number | null;
    difficulty?: "EASY" | "MEDIUM" | "HARD";
    questionText?: string;
    optionA?: string;
    optionB?: string;
    optionC?: string;
    optionD?: string;
    correctOption?: string;
    explanation?: string | null;
  };
}

const BLANK = {
  subject: "PHYSICS" as Subject,
  chapter: "",
  concept: "",
  year: "" as string | number,
  difficulty: "MEDIUM" as "EASY" | "MEDIUM" | "HARD",
  questionText: "",
  optionA: "",
  optionB: "",
  optionC: "",
  optionD: "",
  correctOption: "A",
  explanation: "",
};

export function QuestionForm({ initial }: QuestionFormProps) {
  const router = useRouter();
  const isEdit = !!initial?.id;

  const [form, setForm] = useState({
    ...BLANK,
    ...initial,
    year: initial?.year ?? "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function set(field: string, value: string | number) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const payload = {
      ...form,
      year: form.year === "" ? null : Number(form.year),
    };
    const res = await fetch(
      isEdit ? `/api/questions/${initial!.id}` : "/api/questions",
      {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    setLoading(false);
    if (!res.ok) {
      const d = await res.json();
      setError(JSON.stringify(d.error));
    } else {
      router.push("/admin/questions");
      router.refresh();
    }
  }

  const chapters = CHAPTERS[form.subject] ?? [];

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <select
            value={form.subject}
            onChange={(e) => { set("subject", e.target.value); set("chapter", ""); }}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            {(SUBJECTS as unknown as Subject[]).map((s) => (
              <option key={s} value={s}>{SUBJECT_LABELS[s]}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Chapter</label>
          <select
            value={form.chapter}
            onChange={(e) => set("chapter", e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="">Select chapter</option>
            {chapters.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Concept</label>
          <input
            type="text"
            value={form.concept}
            onChange={(e) => set("concept", e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Year (optional)</label>
          <input
            type="number"
            value={form.year}
            onChange={(e) => set("year", e.target.value)}
            min={2000}
            max={2030}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
          <select
            value={form.difficulty}
            onChange={(e) => set("difficulty", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Question Text</label>
        <textarea
          value={form.questionText}
          onChange={(e) => set("questionText", e.target.value)}
          required
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        />
      </div>

      {(["A", "B", "C", "D"] as const).map((opt) => (
        <div key={opt}>
          <label className="block text-sm font-medium text-gray-700 mb-1">Option {opt}</label>
          <input
            type="text"
            value={form[`option${opt}` as keyof typeof form] as string}
            onChange={(e) => set(`option${opt}`, e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
        </div>
      ))}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Correct Option</label>
        <select
          value={form.correctOption}
          onChange={(e) => set("correctOption", e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Explanation (optional)</label>
        <textarea
          value={form.explanation ?? ""}
          onChange={(e) => set("explanation", e.target.value)}
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-60 hover:bg-blue-700"
        >
          {loading ? "Saving..." : isEdit ? "Update Question" : "Add Question"}
        </button>
      </div>
    </form>
  );
}
