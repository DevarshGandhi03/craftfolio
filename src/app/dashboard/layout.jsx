"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarLinks = [
  { name: "Profile", href: "/dashboard/profile" },
  { name: "Portfolio", href: "/dashboard/portfolio" },
  { name: "Resume", href: "/dashboard/resume" },
  { name: "Blogs", href: "/dashboard/blogs" },
  { name: "Messages", href: "/dashboard/messages" },
];

export default function SettingsLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className=" min-h-screen">
    {/* Top Section */}
    {/* <header className="bg-white p-6 border-b">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-gray-600">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
    </header> */}

    {/* Sidebar + Content Section */}
    <div className="max-w-7xl mx-auto flex">
      {/* Sidebar */}
      <aside className="w-64  p-4">
        <nav>
          <ul className="space-y-2">
            {sidebarLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`block py-2 px-4 rounded ${
                    pathname === link.href
                      ? "bg-purple-100 text-purple-700 font-semibold"
                      : "text-gray-700 hover:bg-purple-50"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Page Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  </div>
  );
}
