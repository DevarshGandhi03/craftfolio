"use client";
import React from "react";
import { Contact, Send } from "lucide-react";
import { BackgroundLines } from "../ui/background-lines";
import avatar from "../../../public/Assets/avatar.jpg";
import Image from "next/image";
import { motion } from "framer-motion";
import { FlipWords } from "../ui/flip-words";

import { Button } from "../ui/button";

function PortfolioHome() {
  const description =
    "Get the best advice from our experts, including expert artists, painters, marathon enthusiasts, and RDX, totally free.";
  const truncateText = (text, wordLimit) => {
    const wordsArray = text.split(" ");
    if (wordsArray.length > wordLimit) {
      return wordsArray.slice(0, wordLimit).join(" ") + " ...";
    }
    return text;
  };

  const words = ["ReactJs Developer", "MERN Developer"];
  return (
    <div className="bg-white">
      <div className="flex flex-col-reverse md:flex-row justify-between items-center px-3 md:px-20 max-h-[90vh]">
        {/* Left Section */}
        
        <div>
          <BackgroundLines className="flex items-center justify-center w-full flex-col px-6 py-6 md:py-12">
            <div className="text-center md:text-left lg:space-y-7 space-y-3">
              <h3 className="text-3xl  font-medium text-neutral-800 dark:text-neutral-300">
                Hi There,
              </h3>
              <h2 className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-5xl md:text-6xl lg:text-8xl font-extrabold tracking-tight leading-tight">
                I'm Devarsh
              </h2>
              <div className="text-2xl md:text-3xl font-light text-neutral-700 dark:text-neutral-300">
                I Am A{" "}
                <span className="font-medium text-neutral-900 dark:text-white">
                  <FlipWords words={words} />
                </span>
              </div>
              <p className="max-w-xl mx-auto md:mx-0 text-base  text-neutral-700 dark:text-neutral-400 leading-relaxed">
                {truncateText(description, 20)} {/* Limit to 15 words */}
              </p>
              <div className="flex sm:w-[100vw] md:w-full md:justify-start justify-center  items-center space-x-2 flex-row">
                <Button
                  type="button"
                  className="flex  lg:w-36 items-center gap-2 p-6 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
                >
                  <p className="text-sm md:text-base">Say Hello</p>
                  <motion.div
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.9, rotate: 15 }}
                    className="flex items-center justify-center"
                  >
                    <Send />
                  </motion.div>
                </Button>
              </div>
            </div>
          </BackgroundLines>
        </div>

        {/* Right Section */}
        <div className="relative h-64 w-64 md:h-96 md:w-96 my-10">
          <div className="absolute w-full h-full bg-gradient-to-tr from-blue-400 to-purple-600 rounded-full animate-pulse blur-3xl opacity-30"></div>
          <Image
            className="rounded-full object-cover"
            src={avatar}
            alt="Avatar"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
}

export default PortfolioHome;
