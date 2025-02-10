"use client";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/authContext";
import axios from "axios";
import { ScrollText, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useState } from "react";
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
  const { setUser } = useContext(AuthContext);
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await axios.delete("/api/users/logout");
    setUser(null);
    router.replace("/signin");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* === Sidebar for Desktop (Always Visible) === */}
      <aside className="hidden md:flex w-72 p-6 bg-[#884DEE] text-white flex-col max-h-screen sticky top-0">
        {/* Logo */}
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

        {/* Logout Button */}
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center w-full py-2 px-4 rounded transition-all duration-200 hover:bg-[#a370f7] hover:scale-105 hover:shadow-md"
          >
            <FaSignOutAlt className="mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* === Mobile Navbar (Visible Only on Small Screens) === */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-white text-gray-900 p-4 flex justify-between items-center z-50">
        {/* Logo */}
        <div className="flex items-center">
          <ScrollText size={35} />
          <p className="ml-2 text-2xl font-semibold">CraftFolio</p>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* === Mobile Sidebar (Slide-in Menu) === */}
      <div
        className={`fixed top-0 left-0 h-full bg-white text-gray-900 w-64 p-6 transform transition-transform duration-300 z-40 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 text-white"
        >
          <X size={30} />
        </button>

        {/* Navigation Links */}
        <nav className="mt-12">
          <ul className="space-y-4">
            {sidebarLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
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
            <li>
            <button
            onClick={handleLogout}
            className="flex items-center w-full py-2 px-4 rounded transition-all duration-200 hover:bg-[#a370f7] hover:scale-105 hover:shadow-md"
          >
            <FaSignOutAlt className="mr-3" />
            Logout
          </button>
            </li>
          </ul>
        </nav>

        
      </div>

      {/* === Page Content === */}
      <main className="flex-1">
        <div className="bg-white p-6 min-h-screen">{children}</div>
      </main>
    </div>
  );
}
