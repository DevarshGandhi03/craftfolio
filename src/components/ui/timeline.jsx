"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import { CheckCircle2, LucideCheckCircle2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full md:mt-20  mt-[13rem] bg-white maven dark:bg-neutral-950  md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl px-4 md:px-8 lg:px-10 flex justify-center items-center flex-col md:block">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-4xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-2 "
        >
          Work History
        </motion.h2>
        <p className="text-neutral-700 px-2 hidden md:block  dark:text-neutral-300 text-sm md:text-base max-w-sm">
          Here's a timeline showcasing my professional experiences.
        </p>
      </div>
      <div ref={ref} className="relative max-w-7xl mx-2 pb-20 md:mx-10">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-32 "
          >
            {/* Timeline Marker */}
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 dark:text-neutral-500">
                {item.jobTitle}
              </h3>
            </div>

            {/* Timeline Content */}
            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                {item.jobTitle}
              </h3>
              <div className="">
                <h3 className="text-emerald-500 font-bold dark:text-neutral-300 text-xl md:text-xl">
                  {item.companyName}
                </h3>

                <p className="text-neutral-600 dark:text-neutral-300 text-sm md:text-base">
                  {item.from} to {item.to}
                </p>
                <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                  {item.city}, {item.state}
                </p>
              </div>
              <div>
                <ul className="list-inside text-gray-600 dark:text-neutral-200 text-sm md:text-sm font-normal mb-4 break-words">
                  {item.jobDescription.split(".").map((bullet, i) =>
                    bullet.trim() ? (
                      <li key={i}>
                        <LucideCheckCircle2
                          className="inline mr-1 text-gray-400 font-bold"
                          size={15}
                        />
                        {bullet.trim()}.
                      </li>
                    ) : null
                  )}
                </ul>
              </div>
            </div>
          </div>
        ))}
        {/* Vertical Timeline Line */}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
