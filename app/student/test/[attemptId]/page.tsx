"use client";

import { useEffect, useState, useCallback, use } from "react";
import { useRouter } from "next/navigation";
import { QuestionCard } from "@/components/test/QuestionCard";
import { QuestionPalette } from "@/components/test/QuestionPalette";
import { SubjectTabs } from "@/components/test/SubjectTabs";
import { TestTimer } from "@/components/test/TestTimer";
import type { Subject } from "@prisma/client";
import { SUBJECTS } from "@/lib/constants";

interface Question {
  id: string;
  subject: Subject;
  chapter: string;
  concept: string;
  year: number | null;
  difficulty: string;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
}

interface AttemptData {
  id: string;
  startedAt: string;
  status: string;
  answers: {
    questionId: string;
    selectedOption: string | null;
    markedForReview: boolean;
    question: Question;
  }[];
}

export default function TestPage({ params }: { params: Promise<{ attemptId: string }> }) {
  const { attemptId } = use(params);
  const router = useRouter();

  const [attempt, setAttempt] = useState<AttemptData | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | null>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [activeSubject, setActiveSubject] = useState<Subject | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  useEffect(() => {
    fetch(`/api/tests/${attemptId}`)
      .then((r) => r.json())
      .then((data: AttemptData) => {
        if (data.status !== "IN_PROGRESS") {
          router.push(`/student/test/${attemptId}/review`);
          return;
        }
        setAttempt(data);
        // Re-hydrate answers
        const a: Record<string, string | null> = {};
        const m: Record<string, boolean> = {};
        for (const ans of data.answers) {
          a[ans.questionId] = ans.selectedOption;
          m[ans.questionId] = ans.markedForReview;
        }
        setAnswers(a);
        setMarkedForReview(m);
      });
  }, [attemptId, router]);

  const saveAnswer = useCallback(
    async (questionId: string, selectedOption: string | null, marked: boolean) => {
      await fetch(`/api/tests/${attemptId}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId, selectedOption, markedForReview: marked }),
      });
    },
    [attemptId]
  );

  function handleSelect(option: string) {
    if (!attempt) return;
    const q = filteredQuestions[currentIndex];
    const newOpt = option === "" ? null : option;
    setAnswers((prev) => ({ ...prev, [q.id]: newOpt }));
    saveAnswer(q.id, newOpt, markedForReview[q.id] ?? false);
  }

  function handleToggleReview() {
    if (!attempt) return;
    const q = filteredQuestions[currentIndex];
    const newVal = !markedForReview[q.id];
    setMarkedForReview((prev) => ({ ...prev, [q.id]: newVal }));
    saveAnswer(q.id, answers[q.id] ?? null, newVal);
  }

  async function handleSubmit() {
    setSubmitting(true);
    const res = await fetch(`/api/tests/${attemptId}/submit`, { method: "POST" });
    if (res.ok) {
      router.push(`/student/test/${attemptId}/review`);
    } else {
      setSubmitting(false);
    }
  }

  if (!attempt) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Loading test...</div>
      </div>
    );
  }

  const allQuestions = attempt.answers.map((a) => a.question);
  const filteredQuestions =
    activeSubject
      ? allQuestions.filter((q) => q.subject === activeSubject)
      : allQuestions;

  const questionIds = allQuestions.map((q) => q.id);

  const answeredCounts = Object.fromEntries(
    (SUBJECTS as unknown as Subject[]).map((s) => [
      s,
      allQuestions.filter(
        (q) => q.subject === s && answers[q.id] != null && answers[q.id] !== ""
      ).length,
    ])
  ) as Record<Subject, number>;

  const totalCounts = Object.fromEntries(
    (SUBJECTS as unknown as Subject[]).map((s) => [
      s,
      allQuestions.filter((q) => q.subject === s).length,
    ])
  ) as Record<Subject, number>;

  const totalAnswered = Object.values(answers).filter(
    (v) => v != null && v !== ""
  ).length;

  const currentQ = filteredQuestions[currentIndex];
  const globalIndex = currentQ ? allQuestions.findIndex((q) => q.id === currentQ.id) : 0;

  return (
    <div className="flex gap-6 max-w-7xl mx-auto">
      {/* Main test area */}
      <div className="flex-1 space-y-4">
        {/* Top bar */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
          <SubjectTabs
            subjects={(SUBJECTS as unknown as Subject[]).filter((s) => totalCounts[s] > 0)}
            activeSubject={activeSubject}
            onSelect={(s) => { setActiveSubject(s); setCurrentIndex(0); }}
            answeredCounts={answeredCounts}
            totalCounts={totalCounts}
          />
          <div className="flex items-center gap-4">
            <TestTimer
              startedAt={attempt.startedAt}
              onExpire={handleSubmit}
            />
            <button
              onClick={() => setShowSubmitModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </div>

        {currentQ && (
          <QuestionCard
            index={currentIndex}
            total={filteredQuestions.length}
            question={currentQ}
            selectedOption={answers[currentQ.id] ?? null}
            markedForReview={markedForReview[currentQ.id] ?? false}
            onSelect={handleSelect}
            onToggleReview={handleToggleReview}
          />
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
            disabled={currentIndex === 0}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-40 hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentIndex((i) => Math.min(filteredQuestions.length - 1, i + 1))
            }
            disabled={currentIndex === filteredQuestions.length - 1}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-40 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Sidebar palette */}
      <div className="w-72 flex-shrink-0">
        <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">Questions</span>
            <span className="text-xs text-gray-400">
              {totalAnswered}/{allQuestions.length} answered
            </span>
          </div>
          <QuestionPalette
            total={allQuestions.length}
            current={globalIndex}
            answers={answers}
            markedForReview={markedForReview}
            questionIds={questionIds}
            onJump={(i) => {
              const targetQ = allQuestions[i];
              if (activeSubject && targetQ.subject !== activeSubject) {
                setActiveSubject(null);
              }
              const newFiltered = activeSubject
                ? allQuestions.filter((q) => q.subject === activeSubject)
                : allQuestions;
              setCurrentIndex(newFiltered.findIndex((q) => q.id === targetQ.id));
            }}
          />
        </div>
      </div>

      {/* Submit modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="text-lg font-bold mb-2">Submit Test?</h3>
            <p className="text-gray-600 text-sm mb-4">
              You have answered {totalAnswered} of {allQuestions.length} questions.
              Unattempted questions will score 0.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 border border-gray-300 rounded-lg py-2 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm font-medium disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
