"use client";
import { AuthContext } from "@/context/authContext";
import { Linkedin, LucideCheckCircle2, Mail, Phone } from "lucide-react";
import React, { useContext } from "react";

import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

function Page() {
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
        <button
          onClick={handlePrint}
          className="bg-blue-500 no-print text-white px-4 py-2 rounded mb-4"
        >
          Download as PDF
        </button>
        <div className="max-w-3xl mx-auto bg-white p-2" id="printable-content">
          <div className=" flex justify-between border-b-4 border-gray-300 pb-4">
            <div>
              <h1 className="text-5xl font-bold uppercase text-gray-800">
                {userPortfolioDetails.fullName.split(" ")[0]}
              </h1>
              <h2 className="text-3xl uppercase text-black">
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
              {userPortfolioDetails.linkedin &&<p className="flex justify-center items-center">
                {<FaLinkedin  />}
                <a href={userPortfolioDetails.linkedin}>&nbsp;Linkedin</a>
              </p>}
              {userPortfolioDetails.github &&<p className="flex justify-center items-center">
                {<FaGithub  />}
                <a href={userPortfolioDetails.github}>&nbsp;Github</a>
              </p>}
              
              
            </div>
          </div>

          <div className="border-b-4 border-gray-300 py-3">
            <p className="text-sm">{userPortfolioDetails.userDescription}</p>
          </div>

          <div className="border-b-4 border-gray-300 py-3">
            <h1 className="text-xl uppercase font-semibold">Experience</h1>
            {userPortfolioDetails.jobExperiences.map((exp, index) => (
              <div key={index} className="mt-2">
                <h2 className="text-base uppercase text-black font-semibold">
                  {exp.jobTitle}
                </h2>
                <h3 className="text-sm text-gray-600">
                  {exp.companyName} {exp.city}, {exp.state}
                </h3>
                <h4 className="text-xs text-gray-500">
                  {exp.from ? formatDate(exp.from) : "N/A"} -{" "}
                  {exp.to === "Present" ? "Present" : formatDate(exp.to)}
                </h4>
                <ul className="list-inside text-sm">
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

          <div className="border-b-4 border-gray-300 py-3">
            <h1 className="text-xl uppercase font-semibold">Projects</h1>
            {userPortfolioDetails.projects.map((project, index) => (
              <div key={index} className="mt-2">
                <h2 className="text-base uppercase text-black font-semibold">
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
                <ul className="list-inside text-sm">
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

          <div className="border-b-4 border-gray-300 py-3">
            <h1 className="text-xl uppercase font-semibold">Education</h1>
            {userPortfolioDetails.education.map((edu, index) => (
              <div key={index} className="mt-2">
                <h2 className="text-base uppercase text-black font-semibold">
                  {edu.degree}
                </h2>
                <h3 className="text-sm text-gray-600">{edu.instituteName}</h3>
                <h4 className="text-xs text-gray-500">
                  {edu.from ? formatDate(edu.from) : "N/A"} -{" "}
                  {edu.to === "Present" ? "Present" : formatDate(edu.to)}
                </h4>
                <p className="text-sm font-semibold">{edu.grade}</p>
              </div>
            ))}
          </div>

          <div className="py-3">
            <h1 className="text-xl uppercase font-semibold">Skills</h1>
            <p className="text-sm text-gray-700 mt-2">
              {userPortfolioDetails.skills.join(", ")}
            </p>
          </div>
        </div>
      </div>
    )
  );
}

export default Page;
