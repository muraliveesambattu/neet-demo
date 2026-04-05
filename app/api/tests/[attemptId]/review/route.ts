import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ attemptId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { attemptId } = await params;

  const attempt = await prisma.testAttempt.findUnique({
    where: { id: attemptId },
    include: {
      answers: {
        include: {
          question: {
            select: {
              id: true, subject: true, chapter: true, concept: true,
              year: true, difficulty: true, questionText: true,
              optionA: true, optionB: true, optionC: true, optionD: true,
              correctOption: true, explanation: true,
            },
          },
        },
      },
      scoreBreakdown: true,
    },
  });

  if (!attempt) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (attempt.userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (attempt.status === "IN_PROGRESS") {
    return NextResponse.json({ error: "Test not yet submitted" }, { status: 403 });
  }

  return NextResponse.json(attempt);
}
