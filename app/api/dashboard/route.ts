import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = session.user.id;

  const [attempts, subjectPerf] = await Promise.all([
    prisma.testAttempt.findMany({
      where: { userId, status: "SUBMITTED" },
      orderBy: { submittedAt: "desc" },
      take: 10,
      include: { scoreBreakdown: true },
    }),
    prisma.subjectPerformance.groupBy({
      by: ["subject"],
      where: { userId },
      _sum: { totalAttempted: true, totalCorrect: true },
    }),
  ]);

  const totalAttempts = await prisma.testAttempt.count({
    where: { userId, status: "SUBMITTED" },
  });

  const scores = attempts.map((a) => a.totalScore ?? 0);
  const averageScore =
    scores.length > 0
      ? Math.round(scores.reduce((s, v) => s + v, 0) / scores.length)
      : 0;
  const bestScore = scores.length > 0 ? Math.max(...scores) : 0;

  const subjectPerformance = subjectPerf.map((p) => ({
    subject: p.subject,
    totalAttempted: p._sum.totalAttempted ?? 0,
    accuracy:
      (p._sum.totalAttempted ?? 0) > 0
        ? Math.round(
            ((p._sum.totalCorrect ?? 0) / (p._sum.totalAttempted ?? 1)) * 100
          )
        : 0,
  }));

  return NextResponse.json({
    totalAttempts,
    averageScore,
    bestScore,
    recentAttempts: attempts,
    subjectPerformance,
  });
}
