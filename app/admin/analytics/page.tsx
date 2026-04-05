import { prisma } from "@/lib/db";

export default async function AdminAnalyticsPage() {
  const [totalUsers, totalQuestions, totalAttempts, subjectCounts] =
    await Promise.all([
      prisma.user.count(),
      prisma.question.count({ where: { isActive: true } }),
      prisma.testAttempt.count({ where: { status: "SUBMITTED" } }),
      prisma.question.groupBy({
        by: ["subject"],
        where: { isActive: true },
        _count: true,
      }),
    ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Platform Analytics</h1>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Users", value: totalUsers },
          { label: "Active Questions", value: totalQuestions },
          { label: "Tests Completed", value: totalAttempts },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="text-3xl font-bold">{s.value}</div>
            <div className="text-sm text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="font-semibold mb-4">Questions by Subject</h2>
        <div className="space-y-2">
          {subjectCounts.map((s) => (
            <div key={s.subject} className="flex items-center justify-between text-sm">
              <span className="text-gray-700">{s.subject}</span>
              <span className="font-medium">{s._count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
