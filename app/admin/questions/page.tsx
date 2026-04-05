"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SUBJECT_LABELS } from "@/lib/constants";
import type { Subject } from "@prisma/client";

interface Question {
  id: string;
  subject: Subject;
  chapter: string;
  difficulty: string;
  year: number | null;
  questionText: string;
  isActive: boolean;
}

export default function AdminQuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [total, setTotal] = useState(0);
  const [subject, setSubject] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [page, setPage] = useState(1);
  const limit = 20;

  useEffect(() => {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (subject) params.set("subject", subject);
    if (difficulty) params.set("difficulty", difficulty);
    fetch(`/api/questions?${params}`)
      .then((r) => r.json())
      .then((d) => { setQuestions(d.questions ?? []); setTotal(d.total ?? 0); });
  }, [subject, difficulty, page]);

  async function handleDelete(id: string) {
    if (!confirm("Deactivate this question?")) return;
    await fetch(`/api/questions/${id}`, { method: "DELETE" });
    setQuestions((prev) => prev.filter((q) => q.id !== id));
    setTotal((t) => t - 1);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Questions ({total})</h1>
        <Link
          href="/admin/questions/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          Add Question
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <select
          value={subject}
          onChange={(e) => { setSubject(e.target.value); setPage(1); }}
          className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
        >
          <option value="">All Subjects</option>
          {(["PHYSICS", "CHEMISTRY", "BOTANY", "ZOOLOGY"] as Subject[]).map((s) => (
            <option key={s} value={s}>{SUBJECT_LABELS[s]}</option>
          ))}
        </select>
        <select
          value={difficulty}
          onChange={(e) => { setDifficulty(e.target.value); setPage(1); }}
          className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
        >
          <option value="">All Difficulties</option>
          <option value="EASY">Easy</option>
          <option value="MEDIUM">Medium</option>
          <option value="HARD">Hard</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Question</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Subject</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Chapter</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Year</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Difficulty</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {questions.map((q) => (
              <tr key={q.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 max-w-xs truncate">{q.questionText}</td>
                <td className="px-4 py-3 text-gray-500">{SUBJECT_LABELS[q.subject]}</td>
                <td className="px-4 py-3 text-gray-500 max-w-[150px] truncate">{q.chapter}</td>
                <td className="px-4 py-3 text-gray-500">{q.year ?? "—"}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    q.difficulty === "EASY" ? "bg-green-50 text-green-700"
                    : q.difficulty === "MEDIUM" ? "bg-yellow-50 text-yellow-700"
                    : "bg-red-50 text-red-700"
                  }`}>
                    {q.difficulty}
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-2 justify-end">
                  <Link
                    href={`/admin/questions/${q.id}/edit`}
                    className="text-blue-600 hover:underline text-xs"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(q.id)}
                    className="text-red-500 hover:underline text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-2 justify-end">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="text-sm border border-gray-300 rounded px-3 py-1 disabled:opacity-40"
        >
          Prev
        </button>
        <span className="text-sm text-gray-500">
          Page {page} of {Math.ceil(total / limit)}
        </span>
        <button
          disabled={page >= Math.ceil(total / limit)}
          onClick={() => setPage((p) => p + 1)}
          className="text-sm border border-gray-300 rounded px-3 py-1 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
