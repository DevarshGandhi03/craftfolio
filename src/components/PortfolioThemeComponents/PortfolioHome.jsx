"use client";
import React from "react";
import { Contact, Send } from "lucide-react";
import { BackgroundLines } from "../ui/background-lines";
import avatar from "../../../public/Assets/avatar.jpg";
import Image from "next/image";
import { motion } from "framer-motion";
import { FlipWords } from "../ui/flip-words";

import { Button } from "../ui/button";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

function PortfolioHome({ portfolioDetails }) {
  const description = portfolioDetails.userDescription;
  const truncateText = (text, wordLimit) => {
    const wordsArray = text.split(" ");
    if (wordsArray.length > wordLimit) {
      return wordsArray.slice(0, wordLimit).join(" ") + " ...";
    }
    return text;
  };
  function splitString(input) {
    return input.split(",").map((str) => str.trim());
  }

  const words = splitString(portfolioDetails.userTitle);
  return (
    <div className="bg-white md:block flex flex-col justify-center items-center gap-y-10">
      <div className="flex flex-col-reverse md:flex-row justify-between items-center px-3 md:px-20">
        <div>
          <BackgroundLines className="flex items-center justify-center w-full flex-col px-6 py-6 md:py-12">
            <div className="text-center  md:text-left lg:space-y-7 space-y-3">
              <h3 className="text-3xl mt-14 md:mt-0 font-medium text-neutral-800 dark:text-neutral-300">
                Hi There,
              </h3>
              <h2 className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-5xl md:text-6xl lg:text-8xl font-extrabold tracking-tight leading-tight">
                I'm {portfolioDetails.fullName.split(" ")[0]}
              </h2>
              <div className="text-2xl md:text-3xl font-light text-neutral-700 dark:text-neutral-300">
                I Am A{" "}
                <span className="font-medium overflow-hidden text-neutral-900 dark:text-white">
                  <FlipWords words={words} />
                </span>
              </div>
              <p className="max-w-xl mx-auto md:mx-0 text-base  text-neutral-700 dark:text-neutral-400 leading-relaxed">
                {truncateText(description, 40)}
              </p>
              <div className="flex sm:w-[100vw] md:w-full md:justify-start justify-center  items-center space-x-2 flex-row">
                <Button
                  type="button"
                  onClick={() => {
                    const contactSection = document.getElementById("contact");
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
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
        <div className="relative h-64 w-64 md:h-96 md:w-96 my-10">
          <div className="absolute w-full h-full bg-gradient-to-tr from-blue-400 to-purple-600 rounded-full animate-pulse blur-3xl opacity-30"></div>
          <Image
            className="rounded-full object-cover"
            src={portfolioDetails.userImage}
            alt={avatar}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <div className="flex mt-14  flex-row md:hidden items-center justify-center space-x-4  ">
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
  );
}

export default PortfolioHome;
