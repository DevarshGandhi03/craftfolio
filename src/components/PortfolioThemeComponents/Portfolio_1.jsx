"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import PortfolioHome from "./PortfolioHome";
import About from "./About";
import Experience from "./Experience";
import Project from "./Project";
import Skills from "./Skills";
import Contact from "./Contact";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from "next/link";

function Portfolio_1({ portfolioDetails }) {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSocialOpen, setIsSocialOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let current = "home";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 60) {
          current = section.getAttribute("id");
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  const handleSetActive = (section) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
  };
  return (
    <div className="maven min-h-[100vh]">
      <nav className="bg-white sticky top-0 z-50 p-3 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="text-3xl ml-2 lg:ml-5 md:ml-5 text-black flex items-end">
            {portfolioDetails.fullName}{" "}
            <div className="ml-1 mb-1 bg-red-500 h-1 w-1 rounded-full"></div>
          </div>

          <div className="hidden md:flex space-x-6">
            {sections.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={cn(
                  "relative text-gray-600 text-lg hover:text-gray-900 transition duration-150 ease-in-out group cursor-pointer",
                  activeSection === link.id ? "text-gray-900 font-semibold" : ""
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute left-0 bottom-0 h-[2px] bg-gray-900 transition-all duration-300",
                    activeSection === link.id
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  )}
                ></span>
              </a>
            ))}
            <Link
              href={`/portfolio/blogs/${portfolioDetails.userName}`}
              className="relative text-gray-600 text-lg hover:text-gray-900 transition duration-150 ease-in-out group cursor-pointer"
              passHref
            >
              Blog
              <span className="absolute left-0 bottom-0 h-[2px] bg-gray-900 transition-all duration-300 w-0 group-hover:w-full"></span>
            </Link>
          </div>

          <div className="md:hidden">
            <button
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>
      </nav>
      <div
        className={cn(
          "fixed z-50 right-0 h-[calc(100%-4rem)] w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="px-6 py-4 space-y-4">
          {sections.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => handleSetActive(link.id)}
              className={cn(
                "block text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-md transition duration-200 ease-in-out text-lg",
                activeSection === link.id
                  ? "text-gray-900 font-semibold bg-gray-100"
                  : ""
              )}
            >
              {link.label}
            </a>
          ))}
          {portfolioDetails.hashnodeUsername && (
            <Link
              href={`/portfolio/blogs/${portfolioDetails.userName}`}
              className="block text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-md transition duration-200 ease-in-out text-lg"
              passHref
            >
              Blogs
            </Link>
          )}
        </div>
      </div>
      <div className="fixed bottom-8 md:block hidden right-6 z-40">
        <button
          className="p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
          onClick={() => setIsSocialOpen(!isSocialOpen)}
        >
          {isSocialOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div
          className={cn(
            "fixed right-24 bottom-8 flex flex-row justify-center items-center space-x-3 transition-all duration-300",
            isSocialOpen
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-8 pointer-events-none"
          )}
        >
          {portfolioDetails.github && (
            <a
              href={portfolioDetails.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition transform hover:scale-110"
            >
              <FaGithub className="w-8 h-8" />
            </a>
          )}
          {portfolioDetails.linkedin && (
            <a
              href={portfolioDetails.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-400 transition transform hover:scale-110"
            >
              <FaLinkedin className="w-8 h-8" />
            </a>
          )}
          {portfolioDetails.twitter && (
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-3 bg-blue-400 text-white rounded-full shadow-lg hover:bg-blue-300 transition transform hover:scale-110"
            >
              <FaTwitter className="w-8 h-8" />
            </a>
          )}
          {portfolioDetails.instagram && (
            <a
              href={portfolioDetails.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-3 bg-pink-600 text-white rounded-full shadow-lg hover:bg-pink-500 transition transform hover:scale-110"
            >
              <FaInstagram className="w-8 h-8" />
            </a>
          )}
        </div>
      </div>
      {sections.map((section) => (
        <section key={section.id} id={section.id}>
          {section.id === "home" && (
            <PortfolioHome portfolioDetails={portfolioDetails} />
          )}
          {section.id === "about" && (
            <About portfolioDetails={portfolioDetails} />
          )}
          {section.id === "experience" && portfolioDetails.jobExperiences && (
            <Experience portfolioDetails={portfolioDetails} />
          )}
          {section.id === "projects" && (
            <Project portfolioDetails={portfolioDetails} />
          )}
          {section.id === "skills" && (
            <Skills portfolioDetails={portfolioDetails} />
          )}
          {section.id === "contact" && (
            <Contact portfolioDetails={portfolioDetails} />
          )}
        </section>
      ))}

      <footer className="bg-white text-gray-800 py-8 border-t border-gray-300 text-center shadow-sm">
        <div className="container mx-auto px-6">
          {/* Brand Name */}
          <h2 className="text-3xl font-extrabold text-blue-600 tracking-wide">
            Craftfolio
          </h2>

          {/* Navigation Links */}
          <ul className="flex flex-wrap justify-center gap-5 mt-4 text-gray-600 text-lg font-medium">
            {[
              "Home",
              "Experience",
              "Projects",
              "About",
              "Contact",
              "Skills",
            ].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-blue-600 transition duration-300"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          {/* Social Links */}
          <h3 className="font-semibold text-gray-700 mt-6 text-lg">
            Stay in touch
          </h3>
          <div className="flex justify-center gap-4 mt-3 text-xl">
            {portfolioDetails.github && (
              <a
                href={portfolioDetails.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-100 text-gray-800 rounded-full shadow-md hover:bg-gray-200 transition-transform transform hover:scale-110 duration-300"
                aria-label="GitHub Profile"
              >
                <FaGithub className="w-7 h-7" />
              </a>
            )}
            {portfolioDetails.linkedin && (
              <a
                href={portfolioDetails.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-blue-100 text-blue-600 rounded-full shadow-md hover:bg-blue-200 transition-transform transform hover:scale-110 duration-300"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin className="w-7 h-7" />
              </a>
            )}
            {portfolioDetails.twitter && (
              <a
                href={portfolioDetails.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-blue-100 text-blue-400 rounded-full shadow-md hover:bg-blue-200 transition-transform transform hover:scale-110 duration-300"
                aria-label="Twitter Profile"
              >
                <FaTwitter className="w-7 h-7" />
              </a>
            )}
            {portfolioDetails.instagram && (
              <a
                href={portfolioDetails.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-pink-100 text-pink-600 rounded-full shadow-md hover:bg-pink-200 transition-transform transform hover:scale-110 duration-300"
                aria-label="Instagram Profile"
              >
                <FaInstagram className="w-7 h-7" />
              </a>
            )}
          </div>

          {/* Footer Text */}
          <p className="text-sm text-gray-500 mt-6">
            &copy; {currentYear} Craftfolio. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Portfolio_1;
