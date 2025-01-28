"use client";

import { motion } from "framer-motion";
import { LucideCheckCircle2 } from "lucide-react";

export default function Skills() {
  const skills = [
    "JavaScript",
    "React",
    "Node.js",
    "SQL",
    "Tailwind CSS",
    "Git & GitHub",
    "Problem Solving",
    "Team Collaboration",
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full px-6 md:px-16 lg:px-24 py-8">
      <h2 className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 text-center md:text-start dark:to-white text-4xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-8 md:mb-12">
        My Skills
      </h2>
      <motion.div
        className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-neutral-900 rounded-lg shadow-sm hover:shadow-md transition"
            variants={itemVariants}
          >
            <LucideCheckCircle2
              size={24}
              className="text-blue-500 dark:text-blue-400"
            />
            <h3 className="text-base font-medium text-neutral-800 dark:text-neutral-100">
              {skill}
            </h3>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
