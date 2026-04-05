import Link from "next/link";

export default function AdminPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 max-w-lg">
        <Link
          href="/admin/questions"
          className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors"
        >
          <div className="text-2xl mb-2">📚</div>
          <div className="font-semibold">Questions</div>
          <div className="text-sm text-gray-400">Manage question pool</div>
        </Link>
        <Link
          href="/admin/analytics"
          className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors"
        >
          <div className="text-2xl mb-2">📊</div>
          <div className="font-semibold">Analytics</div>
          <div className="text-sm text-gray-400">Platform-wide stats</div>
        </Link>
      </div>
    </div>
  );
}
