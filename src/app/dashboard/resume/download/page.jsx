"use client";
import Theme_1 from "@/components/ResumeComponents/Theme_1";
import Theme_2 from "@/components/ResumeComponents/Theme_2";
import Theme_3 from "@/components/ResumeComponents/Theme_3";
import { PortfolioContext } from "@/context/portfolioContext";
import { LucideCheckCircle2, Mail, Phone } from "lucide-react";
import React, { useContext } from "react";

import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

function Resume() {
  const { resumeTheme, setResumeTheme } = useContext(PortfolioContext);
  return resumeTheme && <div>
    {resumeTheme === "theme_1" && <Theme_1 />}
    {resumeTheme === "theme_2" && <Theme_2 />}
    {resumeTheme === "theme_3" && <Theme_3 />}
  </div>
}

export default Resume;
