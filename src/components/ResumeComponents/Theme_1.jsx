"use client";
import { AuthContext } from "@/context/authContext";
import { LucideCheckCircle2, Mail, Phone } from "lucide-react";
import React, { useContext } from "react";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Button } from "../ui/button";

function Theme_1() {
  const { userPortfolioDetails, user } = useContext(AuthContext);

  const handlePrint = () => {
    window.print();
  };

  function formatDate(dateString) {
    if (
      !dateString ||
      typeof dateString !== "string" ||
      !/^\d{4}-\d{2}$/.test(dateString)
    ) {
      throw new Error("Invalid date format. Expected yyyy-MM");
    }
    const [year, month] = dateString.split("-").map(Number);
    if (month < 1 || month > 12) {
      throw new Error("Invalid month value");
    }

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${monthNames[month - 1]} ${year}`;
  }

  return (
    userPortfolioDetails &&
    user && (
      <div>
        <Button
          onClick={handlePrint}
          className="bg-blue-500 no-print mt-16 md:mt-1 mx-auto  text-white  px-4 py-2 rounded mb-4"
        >
          Download as PDF
        </Button>
        <div className="max-w-[100vw] md:max-w-screen theme_1 mx-auto printable-content bg-white p-2">
          <div className=" flex  justify-between border-b-4 border-gray-400 pb-4">
            <div>
              <h1 className="text-5xl font-semibold uppercase text-gray-600">
                {userPortfolioDetails.fullName.split(" ")[0]}
              </h1>
              <h2 className="text-5xl uppercase text-black">
                {userPortfolioDetails?.fullName?.split(" ")[1]}
              </h2>
            </div>
            <div className="text-center space-y-2 flex flex-col items-start text-sm">
              <p className="flex justify-center items-center">
                {<Phone size={15} />} &nbsp;{"+91 "}{" "}
                {userPortfolioDetails.phoneNo}
              </p>
              <p className="flex justify-center items-center">
                {<Mail size={15} />}
                <a href={`mailto:${user.email}`}>&nbsp;{user.email}</a>
              </p>
              {userPortfolioDetails.linkedin && (
                <p className="flex justify-center items-center">
                  {<FaLinkedin />}
                  <a href={userPortfolioDetails.linkedin}>&nbsp;Linkedin</a>
                </p>
              )}
              {userPortfolioDetails.github && (
                <p className="flex justify-center items-center">
                  {<FaGithub />}
                  <a href={userPortfolioDetails.github}>&nbsp;Github</a>
                </p>
              )}
            </div>
          </div>

          <div className="border-b-4 border-gray-400 py-3">
            <p className="text-sm">{userPortfolioDetails.userDescription}</p>
          </div>

          <div className="border-b-4 border-gray-400 py-3">
            <h1 className="text-xl uppercase  text-gray-700">Experience</h1>
            {userPortfolioDetails.jobExperiences.map((exp, index) => (
              <div key={index} className="mt-1 ">
                <h2 className="text-sm uppercase text-black font-semibold">
                  {exp.jobTitle}
                </h2>
                <h3 className="text-sm text-gray-600">
                  {exp.companyName} {exp.city}, {exp.state}
                </h3>
                <h4 className="text-xs text-gray-500">
                  {exp.from ? formatDate(exp.from) : "N/A"} -{" "}
                  {exp.to === "Present" ? "Present" : formatDate(exp.to)}
                </h4>
                <ul className="list-inside text-sm break-words">
                  {exp.jobDescription.split(".").map((bullet, i) =>
                    bullet.trim() ? (
                      <li key={i}>
                        <LucideCheckCircle2
                          className="inline mr-1 text-gray-600 font-bold"
                          size={10}
                        />
                        {bullet.trim()}.
                      </li>
                    ) : null
                  )}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-b-4 border-gray-400 py-3">
            <h1 className="text-xl uppercase  text-gray-700">Projects</h1>
            {userPortfolioDetails.projects.map((project, index) => (
              <div key={index} className="mt-1">
                <h2 className="text-sm uppercase text-black font-semibold">
                  {project.projectTitle}
                </h2>
                <a
                  href={project.projectLiveLink}
                  className="text-blue-500 text-sm break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.projectLiveLink}
                </a>
                <ul className="list-inside text-sm break-words">
                  {project.projectDescription.split(".").map((bullet, i) =>
                    bullet.trim() ? (
                      <li key={i}>
                        <LucideCheckCircle2
                          className="inline mr-1 text-gray-600 font-bold"
                          size={10}
                        />
                        {bullet.trim()}.
                      </li>
                    ) : null
                  )}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-b-4 border-gray-400 py-3">
            <h1 className="text-xl uppercase text-gray-700">Education</h1>
            {userPortfolioDetails.education.map((edu, index) => (
              <div key={index} className="mt-1">
                <h2 className="text-sm uppercase text-black font-semibold">
                  {edu.degree}
                </h2>
                <h3 className="text-sm text-gray-600">{edu.instituteName}</h3>
                <h4 className="text-xs text-gray-500">
                  {edu.from ? formatDate(edu.from) : "N/A"} -{" "}
                  {edu.to === "Present" ? "Present" : formatDate(edu.to)}
                </h4>
                <p className="text-sm ">Grade- {edu.grade}</p>
              </div>
            ))}
          </div>

          <div className="py-3">
            <h1 className="text-xl uppercase text-gray-700">Skills</h1>

            <ul className="flex  flex-wrap text-sm flex-1 mt-2 list-inside ">
              {userPortfolioDetails.skills.map((skill, i) =>
                skill.trim() ? (
                  <li key={i} className="w-1/3">
                    <LucideCheckCircle2
                      className="inline mr-1 text-gray-600 font-bold"
                      size={10}
                    />
                    {skill.trim()}
                  </li>
                ) : null
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  );
}

export default Theme_1;
