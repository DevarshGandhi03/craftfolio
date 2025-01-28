"use client";

import { IconEye } from "@tabler/icons-react";

export default function Projects() {
  const projects = [
    {
      projectTitle: "Aceternity",
      projectImage:
        "http://res.cloudinary.com/dnt5vk7qk/image/upload/v1738073563/vydd6zlfggzvscn0qz9o.png", // Replace with actual image URL
      projectDescription:
        "A design and development studio that focuses on building quality apps.",
      projectLiveLink: "#", // Replace with actual link
    },
    {
      projectTitle: "Algochurn",
      projectImage:
        "http://res.cloudinary.com/dnt5vk7qk/image/upload/v1738073563/vydd6zlfggzvscn0qz9o.png", // Replace with actual link
      projectDescription:
        "Practice for technical interviews with hands-on coding challenges.",
      projectLiveLink: "#", // Replace with actual link
    },
    {
      projectTitle: "Algochurn",
      projectImage:
        "http://res.cloudinary.com/dnt5vk7qk/image/upload/v1738073563/vydd6zlfggzvscn0qz9o.png", // Replace with actual link
      projectDescription:
        "Practice for technical interviews with hands-on coding challenges.",
      projectLiveLink: "#", // Replace with actual link
    },
    {
      projectTitle: "Algochurn",
      projectImage:
        "http://res.cloudinary.com/dnt5vk7qk/image/upload/v1738073563/vydd6zlfggzvscn0qz9o.png", // Replace with actual link
      projectDescription:
        "Practice for technical interviews with hands-on coding challenges.",
      projectLiveLink: "#", // Replace with actual link
    },
  ];

  return (
    <div className="w-full px-6  md:px-20 my-12 mx-auto py-10 flex flex-col justify-center items-center md:items-start">
      <h2 className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 text-center md:text-start dark:to-white text-4xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-8 md:mb-12">
        What I've been working on
      </h2>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2  lg:mx-0">
        {projects.map((project, index) => (
          <div
            key={index}
            className="flex flex-col bg-gray-50 dark:bg-neutral-800 p-5 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105"
          >
            <img
              src={project.projectImage}
              alt={project.projectTitle}
              className="w-full h-48 object-cover rounded-md"
            />
            <div className="mt-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                {project.projectTitle}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {project.projectDescription}
              </p>
              <button
                onClick={() => window.open(project.projectLiveLink, "_blank")}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white font-medium rounded-md shadow hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                aria-label={`View ${project.projectTitle} project`}
              >
                <IconEye size={16} />
                View Project
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
