"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const navItems = [
  { href: "/student/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/student/test/generate", label: "Start Test", icon: "📝" },
  { href: "/student/history", label: "History", icon: "📋" },
  { href: "/student/analysis", label: "Analysis", icon: "🔬" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-xl font-bold text-blue-600">NEET Prep</h1>
        <p className="text-xs text-gray-500 mt-1">Smart Mock Tests</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}

        {session?.user?.role === "ADMIN" && (
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-purple-600 hover:bg-purple-50"
          >
            <span>⚙️</span>
            Admin
          </Link>
        )}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="text-sm text-gray-700 font-medium mb-1 truncate">
          {session?.user?.name}
        </div>
        <div className="text-xs text-gray-400 truncate mb-3">
          {session?.user?.email}
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full text-sm text-gray-500 hover:text-red-600 transition-colors text-left"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
