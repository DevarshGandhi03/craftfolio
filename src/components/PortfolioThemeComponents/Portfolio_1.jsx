"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import PortfolioHome from "./PortfolioHome";
import About from "./About";
import Experience from "./Experience";
import Project from "./Project";
import Skills from "./Skills";
import Contact from "./Contact";

function Portfolio_1() {
  const [activeSection, setActiveSection] = useState("#home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sections = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#education", label: "Education" },
    { href: "#contact", label: "Contact" },
  ];
  const handleSetActive = (section) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
  };
  return (
    <div className="maven">
      <nav className="bg-white sticky top-0 z-50 p-3 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="text-3xl ml-2 lg:ml-5 md:ml-5 text-black flex items-end">
            Devarsh
            <div className="ml-1 mb-1 bg-red-500 h-1 w-1 rounded-full"></div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            {sections.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleSetActive(link.href)}
                className={cn(
                  "relative text-gray-600 text-lg hover:text-gray-900 transition duration-150 ease-in-out group",
                  activeSection === link.href
                    ? "text-gray-900 font-semibold"
                    : ""
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute left-0 bottom-0 h-[2px] bg-gray-900 transition-all duration-300",
                    activeSection === link.href
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  )}
                ></span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>
      <div
        className={cn(
          "fixed z-50 right-0 h-[calc(100%-4rem)] w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out rounded-l-2xl",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="px-6 py-4 space-y-4">
          {sections.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => handleSetActive(link.href)}
              className={cn(
                "block text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-md transition duration-200 ease-in-out text-lg",
                activeSection === link.href
                  ? "text-gray-900 font-semibold bg-gray-100"
                  : ""
              )}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <PortfolioHome />
      <About />
      <Experience/>
      <Project/>
      <Skills/>
      <Contact/>
    </div>
  );
}

export default Portfolio_1;
