"use client";
import React from "react";
import { Calendar, Download, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FloatingDock } from "../ui/floating-dock";
import { IconBrandGithub, IconBrandX, IconHome } from "@tabler/icons-react";

function About({ portfolioDetails }) {
  const description = portfolioDetails.about;

  const truncateText = (text, wordLimit) => {
    const wordsArray = text.split(" ");
    if (wordsArray.length > wordLimit) {
      return wordsArray.slice(0, wordLimit).join(" ") + " ...";
    }
    return text;
  };

  const educationTimeline = portfolioDetails.education;

  return (
    <div className=" px-6 lg:px-16 flex flex-col justify-start items-center  lg:items-stretch  lg:mx-4 py-12  min-h-[90vh] max-h-[95vh]">
      <div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-4xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-8 md:mb-12 "
        >
          About Me
        </motion.h2>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-start items-center justify-center">
        {/* Left Side - Text Content */}
        <div className="flex-1 relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base lg:text-lg text-neutral-700 dark:text-neutral-400 leading-relaxed max-w-xl"
          >
            {truncateText(description, 110)}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-start items-center space-x-2 flex-row mt-6"
          >
          {portfolioDetails.resume &&   <Button
              type="button"
              onClick={() => {
                const link = document.createElement("a");
                link.href = portfolioDetails.resume; // Update with your actual file path
                link.download = "Resume.pdf"; // Name of the file when downloaded
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="flex items-center gap-2 p-6 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
            >
              <p className="text-base">Resume</p>
              <motion.div
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.9, rotate: 15 }}
                className="flex items-center justify-center"
              >
                <Download />
              </motion.div>
            </Button>}
         
          </motion.div>
        </div>

        {/* Right Side - Education Timeline */}
        <div className="flex-1 mt-12 px-4 justify-center items-center overflow-x-visible overflow-y-auto lg:mt-0 w-full max-w-[500px] max-h-96 custom-scrollbar">
          <ol className="relative border-s border-gray-200 dark:border-gray-800">
            {educationTimeline.map((item, index) => (
              <motion.li
                key={index}
                className="mb-12 ms-6 group"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full -start-[6.5px] border border-white dark:border-gray-900 dark:bg-gray-700 group-hover:bg-gray-300 dark:group-hover:bg-gray-600 transition-colors"></div>
                <time className="mb-2 text-sm font-normal leading-none text-gray-500 dark:text-gray-400 flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {item.from} - {item.to}
                </time>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  {item.instituteName}
                </h4>
                <p className="mb-1 text-base font-normal text-gray-600 dark:text-gray-300">
                  {item.degree}
                </p>
                {item.grade && (
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Grade: {item.grade}
                  </p>
                )}
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default About;
