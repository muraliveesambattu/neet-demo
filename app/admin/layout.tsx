import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-56 bg-gray-900 text-white p-6 flex-shrink-0">
        <h2 className="text-lg font-bold mb-6">Admin</h2>
        <nav className="space-y-2">
          <Link href="/admin/questions" className="block text-sm text-gray-300 hover:text-white py-1">
            Questions
          </Link>
          <Link href="/admin/analytics" className="block text-sm text-gray-300 hover:text-white py-1">
            Analytics
          </Link>
          <Link href="/student/dashboard" className="block text-sm text-gray-400 hover:text-white py-1 mt-6 border-t border-gray-700 pt-4">
            Back to App
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
