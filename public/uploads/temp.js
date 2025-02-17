"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/authContext";

export default function ProfilePage() {
  const { user } = useContext(AuthContext);

  // State for main fields
  const [projects, setProjects] = useState([]);
  const [education, setEducation] = useState([]);
  const [jobExperiences, setJobExperiences] = useState([]);

  // State for individual sections
  const [newProject, setNewProject] = useState({
    projectTitle: "",
    projectImage: "",
    projectDescription: "",
    projectLiveLink: "",
  });
  const [newEducation, setNewEducation] = useState({
    instituteName: "",
    degree: "",
    from: "",
    to: "",
  });
  const [newJob, setNewJob] = useState({
    companyName: "",
    city: "",
    state: "",
    jobTitle: "",
    jobDescription: "",
    from: "",
    to: "",
  });

  // Error states
  const [projectErrors, setProjectErrors] = useState({});
  const [educationErrors, setEducationErrors] = useState({});
  const [jobErrors, setJobErrors] = useState({});

  // Validation Functions
  const validateProject = () => {
    let errors = {};
    if (!newProject.projectTitle.trim())
      errors.projectTitle = "Project title is required.";
    if (!newProject.projectImage.trim())
      errors.projectImage = "Project image is required.";
    if (!newProject.projectDescription.trim())
      errors.projectDescription = "Project description is required.";
    if (
      !newProject.projectLiveLink.trim() ||
      !/^https?:\/\/.+$/.test(newProject.projectLiveLink)
    ) {
      errors.projectLiveLink = "Valid live link is required.";
    }
    setProjectErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateEducation = () => {
    let errors = {};
    if (!newEducation.instituteName.trim())
      errors.instituteName = "Institute name is required.";
    if (!newEducation.degree.trim()) errors.degree = "Degree is required.";
    if (!newEducation.from.trim()) errors.from = "Start date is required.";
    if (!newEducation.to.trim()) errors.to = "End date is required.";
    setEducationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateJob = () => {
    let errors = {};
    if (!newJob.companyName.trim())
      errors.companyName = "Company name is required.";
    if (!newJob.city.trim()) errors.city = "City is required.";
    if (!newJob.state.trim()) errors.state = "State is required.";
    if (!newJob.jobTitle.trim()) errors.jobTitle = "Job title is required.";
    if (!newJob.jobDescription.trim())
      errors.jobDescription = "Job description is required.";
    if (!newJob.from.trim()) errors.from = "Start date is required.";
    if (!newJob.to.trim()) errors.to = "End date is required.";
    setJobErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Add Project
  const handleAddProject = () => {
    if (validateProject()) {
      setProjects([...projects, newProject]);
      setNewProject({
        projectTitle: "",
        projectImage: "",
        projectDescription: "",
        projectLiveLink: "",
      });
      setProjectErrors({});
    }
  };

  // Add Education
  const handleAddEducation = () => {
    if (validateEducation()) {
      setEducation([...education, newEducation]);
      setNewEducation({
        instituteName: "",
        degree: "",
        from: "",
        to: "",
      });
      setEducationErrors({});
    }
  };

  // Add Job Experience
  const handleAddJob = () => {
    if (validateJob()) {
      setJobExperiences([...jobExperiences, newJob]);
      setNewJob({
        companyName: "",
        city: "",
        state: "",
        jobTitle: "",
        jobDescription: "",
        from: "",
        to: "",
      });
      setJobErrors({});
    }
  };

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Profile</h2>

      {/* Projects Section */}
      <h3 className="text-lg font-semibold">Projects</h3>
      <Dialog>
        <DialogTrigger asChild>
          <Button type="button">Add Project</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Project</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Project Title"
            value={newProject.projectTitle}
            onChange={(e) =>
              setNewProject({ ...newProject, projectTitle: e.target.value })
            }
          />
          {projectErrors.projectTitle && (
            <p className="text-red-500">{projectErrors.projectTitle}</p>
          )}
          <Input
            placeholder="Project Image"
            value={newProject.projectImage}
            onChange={(e) =>
              setNewProject({ ...newProject, projectImage: e.target.value })
            }
          />
          {projectErrors.projectImage && (
            <p className="text-red-500">{projectErrors.projectImage}</p>
          )}
          <Textarea
            placeholder="Project Description"
            value={newProject.projectDescription}
            onChange={(e) =>
              setNewProject({
                ...newProject,
                projectDescription: e.target.value,
              })
            }
          />
          {projectErrors.projectDescription && (
            <p className="text-red-500">{projectErrors.projectDescription}</p>
          )}
          <Input
            placeholder="Live Link"
            value={newProject.projectLiveLink}
            onChange={(e) =>
              setNewProject({ ...newProject, projectLiveLink: e.target.value })
            }
          />
          {projectErrors.projectLiveLink && (
            <p className="text-red-500">{projectErrors.projectLiveLink}</p>
          )}
          <DialogFooter>
            <Button onClick={handleAddProject}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Repeat similar structure for Education and Job Experience with their validation */}
    </section>
  );
}
