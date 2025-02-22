import React, { useContext } from "react";
import { Button } from "../ui/button";
import { AuthContext } from "@/context/authContext";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail, Phone } from "lucide-react";

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
        <div
          className="flex justify-center max-w-[100vw] md:max-w-screen printable-content min-h-screen theme_3"
          id="theme_3"
        >
          <div className="max-w-3xl">
            <h1 className="text-4xl pb-4 font-light text-center  border-b border-gray-800 tracking-widest">
              {userPortfolioDetails.fullName}
            </h1>
            <div className=" mt-2 border-b border-gray-800 pb-2">
              <p className="text-center text-lg uppercase ">
                {userPortfolioDetails.userTitle.split(",")[0]}
              </p>
              <p className="  text-sm leading-relaxed">
                {userPortfolioDetails.userDescription}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-5">
              <div>
                <h2 className="text-md font-semibold tracking-wide border-b border-gray-800 w-fit pr-6 pb-1">
                  CONTACT
                </h2>
                <p className="mt-2 text-sm flex  items-center">
                  {<Phone size={15} />} &nbsp;{"+91 "}{" "}
                  {userPortfolioDetails.phoneNo}
                </p>
                <p className=" text-sm flex  items-center">
                  {" "}
                  {<Mail size={15} />}
                  <a href={`mailto:${user.email}`}>&nbsp;{user.email}</a>
                </p>
                <p className=" text-sm flex  items-center">
                  {<FaLinkedin />}
                  <a href={userPortfolioDetails.linkedin}>&nbsp;Linkedin</a>
                </p>
                <p className=" text-sm flex items-center">
                  {" "}
                  {<FaGithub />}
                  <a href={userPortfolioDetails.github}>&nbsp;Github</a>
                </p>

                <h2 className="text-md font-semibold tracking-wide border-b border-gray-800 w-fit pr-6 pb-1 mt-6">
                  SKILLS
                </h2>
                <ul className="mt-2  text-sm">
                  {userPortfolioDetails.skills.map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ul>

                <h2 className="text-md font-semibold tracking-wide border-b border-gray-800 w-fit pr-6 pb-1 mt-6">
                  EDUCATION
                </h2>
                {userPortfolioDetails.education.map((edu, index) => (
                  <div key={index} className="mt-2">
                    <p className=" font-semibold text-sm ">
                      {edu.instituteName}
                    </p>
                    <p className=" text-sm">
                      {edu.from ? formatDate(edu.from) : "N/A"} -{" "}
                      {edu.to === "Present" ? "Present" : formatDate(edu.to)}
                    </p>
                    <p className=" text-sm">{edu.degree}</p>
                  </div>
                ))}
              </div>
              <div>
                <h2 className="text-md font-semibold tracking-wide border-b border-gray-800 w-fit pr-6 pb-1">
                  PROJECTS
                </h2>
                {userPortfolioDetails.projects.map((project, index) => (
                  <div key={index} className="mt-2">
                    <p className="text-sm font-semibold">
                      {project.projectTitle}
                    </p>
                    <ul className="  break-words leading-relaxed text-sm">
                      {project.projectDescription
                        .split(".")
                        .map((bullet, i) =>
                          bullet.trim() ? (
                            <li key={i}>{bullet.trim()}.</li>
                          ) : null
                        )}
                    </ul>
                    <a
                      href={project.projectLiveLink}
                      className="text-blue-500 text-sm"
                    >
                      Live Link
                    </a>
                  </div>
                ))}
                {userPortfolioDetails.jobExperiences ? (
                  <>
                    <h2 className="text-md font-semibold tracking-wide border-b border-gray-800 w-fit pr-6 pb-1 mt-6">
                      EXPERIENCE
                    </h2>
                    {userPortfolioDetails.jobExperiences.map((exp, index) => (
                      <div key={index} className="mt-2 max-w-30vw">
                        <p className=" text-sm font-semibold">{exp.jobTitle}</p>
                        <p className=" text-sm">
                          {exp.companyName} {exp.city}, {exp.state}
                        </p>
                        <p className=" text-gray-800 text-xs">
                          {exp.from ? formatDate(exp.from) : "N/A"} -{" "}
                          {exp.to === "Present"
                            ? "Present"
                            : formatDate(exp.to)}
                        </p>

                        <ul className=" text-sm  leading-relaxed break-words">
                          {exp.jobDescription
                            .split(".")
                            .map((bullet, i) =>
                              bullet.trim() ? (
                                <li key={i}>{bullet.trim()}.</li>
                              ) : null
                            )}
                        </ul>
                      </div>
                    ))}
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Resume;
