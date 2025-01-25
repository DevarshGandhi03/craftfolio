"use client";
import axios from "axios";
import { ScrollText } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaUser,
  FaBriefcase,
  FaFileAlt,
  FaBlog,
  FaEnvelope,
  FaSignOutAlt,
} from "react-icons/fa";

const sidebarLinks = [
  { name: "Profile", href: "/dashboard/profile", icon: <FaUser /> },
  { name: "Portfolio", href: "/dashboard/portfolio", icon: <FaBriefcase /> },
  { name: "Resume", href: "/dashboard/resume", icon: <FaFileAlt /> },
  { name: "Blogs", href: "/dashboard/blogs", icon: <FaBlog /> },
  { name: "Messages", href: "/dashboard/messages", icon: <FaEnvelope /> },
];

export default function SettingsLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await axios.delete("/api/users/logout");
    router.replace("/signin");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-72 p-6 bg-[#884DEE] text-white flex flex-col max-h-screen sticky top-0">
        {/* Company Logo and Name */}
        <div className="flex items-center mt-4 mb-8">
          <ScrollText size={45} className="text-white" />
          <p className="ml-2 text-3xl font-bold tracking-wide">CraftFolio</p>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="space-y-2">
            {sidebarLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`flex items-center py-2 px-4 rounded transition-all duration-200 ${
                    pathname === link.href
                      ? "bg-[#a370f7] text-white font-bold shadow-lg scale-105"
                      : "hover:bg-[#a370f7] hover:scale-105 hover:shadow-md"
                  }`}
                >
                  <span className="mr-3">{link.icon}</span>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button at Bottom */}
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="flex  items-center w-full py-2 px-4 rounded transition-all duration-200 hover:bg-[#a370f7] hover:scale-105 hover:shadow-md"
          >
            <FaSignOutAlt className="mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Page Content */}
      <main className="flex-1">
        <div className="bg-white p-6 min-h-screen">{children}</div>
      </main>
    </div>
  );
}
