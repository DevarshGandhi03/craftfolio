import React, { useContext } from "react";
import { Button } from "../ui/button";
import { AuthContext } from "@/context/authContext";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { LucideCheckCircle2, Mail, Phone } from "lucide-react";

const Resume = () => {
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
          className="bg-blue-500 no-print mt-16 md:mt-1 mx-auto text-white px-4 py-2 rounded mb-4"
        >
          Download as PDF
        </Button>
        <div className=" flex max-w-[100vw] md:max-w-screen justify-center printable-content theme_2 ">
          <div className="w-full hDiv max-w-4xl  grid grid-cols-3 bg-white ">
            {/* Left Sidebar */}
            <div className="bg-violet-200 p-8  col-span-1">
              <h2 className="text-lg font-bold uppercase">Summary</h2>
              <p className="text-sm mt-2 break-words">
                {userPortfolioDetails.userDescription}
              </p>
              <h2 className="text-lg font-bold uppercase mt-6">Contact</h2>
              <ul className="text-sm list-inside list-disc mt-2 space-y-1">
                <li>
                  {"+91 "} {userPortfolioDetails.phoneNo}
                </li>
                <li>
                  {" "}
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </li>
                <li>
                  {" "}
                  <a href={userPortfolioDetails.linkedin}>Linkedin</a>
                </li>
                <li>
                  <a href={userPortfolioDetails.github}>Github</a>
                </li>
              </ul>
              <h2 className="text-lg font-bold uppercase mt-6">Education</h2>
              {userPortfolioDetails.education.map((edu, index) => (
                <div key={index} className="mt-2">
                  <p className="text-sm mt-2">
                    {edu.instituteName} <br /> {edu.degree} <br />{" "}
                    {edu.from ? formatDate(edu.from) : "N/A"} -{" "}
                    {edu.to === "Present" ? "Present" : formatDate(edu.to)}
                  </p>
                </div>
              ))}
              <h2 className="text-lg font-bold uppercase mt-6">Skills</h2>
             
              <ul className="flex  flex-wrap text-sm flex-1 mt-2 list-inside ">
                {userPortfolioDetails.skills.map((skill, i) =>
                  skill.trim() ? (
                    <li key={i} className="w-1/2">
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
            {/* Right Main Content */}
            <div className="p-8 col-span-2">
              <h1 className="text-5xl font-semibold">
                {userPortfolioDetails.fullName.split(" ")[0]}
              </h1>
              <h1 className="text-5xl font-semibold">
                {userPortfolioDetails.fullName.split(" ")[1]}
              </h1>
              <h2 className="text-xl font-semibold mt-2">
                {userPortfolioDetails.userTitle.split(",")[0]}
              </h2>
              <hr className="my-4" />
              <div className="mt-4">
                {userPortfolioDetails.jobExperiences ? (
                  <>
                    <h2 className="text-lg font-bold">Experience</h2>
                    {userPortfolioDetails.jobExperiences.map((exp, index) => (
                      <div key={index} className="mt-2">
                        <h3 className="font-bold uppercase">
                          {exp.jobTitle} &nbsp;{" "}
                          <span className="font-normal">{exp.companyName}</span>
                        </h3>
                        <h4 className="text-sm">
                          {exp.companyName} {exp.city}, {exp.state}
                        </h4>

                        <p className="text-xs text-gray-500">
                          {exp.from ? formatDate(exp.from) : "N/A"} -{" "}
                          {exp.to === "Present"
                            ? "Present"
                            : formatDate(exp.to)}
                        </p>

                        <ul className=" text-sm leading-relaxed break-words">
                          {exp.jobDescription
                            .split(".")
                            .map((bullet, i) =>
                              bullet.trim() ? (
                                <li key={i}>{bullet.trim()}.</li>
                              ) : null
                            )}
                        </ul>
                        <hr className="my-3" />
                      </div>
                    ))}
                  </>
                ) : null}
              </div>
              <div>
                <h2 className="text-lg font-bold">Project</h2>
                {userPortfolioDetails.projects.map((project, index) => (
                  <div key={index} className="mt-2">
                    <h3 className="font-bold uppercase">
                      {project.projectTitle}
                    </h3>
                    <a
                      href={project.projectLiveLink}
                      className="text-blue-500 text-sm mt-0"
                    >
                      {project.projectLiveLink}
                    </a>
                    <ul className="text-sm leading-relaxed break-words">
                      {project.projectDescription
                        .split(".")
                        .map((bullet, i) =>
                          bullet.trim() ? (
                            <li key={i}>{bullet.trim()}.</li>
                          ) : null
                        )}
                    </ul>
                    <hr className="my-3" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Resume;
