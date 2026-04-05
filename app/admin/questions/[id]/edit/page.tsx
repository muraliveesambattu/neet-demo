import { QuestionForm } from "@/components/admin/QuestionForm";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function EditQuestionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const question = await prisma.question.findUnique({ where: { id } });
  if (!question) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Question</h1>
      <QuestionForm
        initial={{
          id: question.id,
          subject: question.subject,
          chapter: question.chapter,
          concept: question.concept,
          year: question.year,
          difficulty: question.difficulty,
          questionText: question.questionText,
          optionA: question.optionA,
          optionB: question.optionB,
          optionC: question.optionC,
          optionD: question.optionD,
          correctOption: question.correctOption,
          explanation: question.explanation,
        }}
      />
    </div>
  );
}
