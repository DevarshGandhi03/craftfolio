import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { PortfolioContext } from "@/context/portfolioContext";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Trash2, PlusCircle, Edit2, Edit } from "lucide-react"; // Added Edit icon
import Link from "next/link";

function Projects() {
  const [projectErrors, setProjectErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null); // Track the editing index
  const { projects, errors, setProjects, handleRemoveImage } =
    useContext(PortfolioContext);
  const [newProject, setNewProject] = useState({
    projectTitle: "",
    projectImage: "",
    projectDescription: "",
    projectTempImage: null,
    projectLiveLink: "",
    projectImageId: "",
    projectPrevImage: null,
  });

  const validateProject = () => {
    let errors = {};
    if (!newProject.projectTitle.trim())
      errors.projectTitle = "Project title is required.";
    if (!(newProject.projectPrevImage || newProject.projectImage))
      errors.projectPrevImage = "Project image is required.";
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

  const handleAddProject = () => {
    if (validateProject()) {
      if (editingIndex !== null) {
        // Update existing project
        const updatedProjects = [...projects];
        updatedProjects[editingIndex] = newProject;
        setProjects(updatedProjects);
      } else {
        // Add new project
        setProjects([...projects, newProject]);
      }
      setNewProject({
        projectTitle: "",
        projectImage: "",
        projectTempImage: null,
        projectDescription: "",
        projectLiveLink: "",
        projectImageId: "",
        projectPrevImage: null,
      });
      setEditingIndex(null);
      setProjectErrors({});
      setOpen(false);
    }
  };

  async function handleRemoveProject(index) {
    let projectArr = [...projects];
    let public_id = projectArr[index].projectImageId;
    const response = await handleRemoveImage(public_id);
    if (response.data.success) {
      projectArr = projectArr.filter((_, i) => i !== index);
    }
    setProjects(projectArr);
  }
  async function handleRemoveProjectImage(publicId) {
    const response = await axios.post("/api/users/remove-file", {
      public_id: publicId,
    });
    if (response.data.success) {
      setNewProject({
        ...newProject,
        projectImage: "",
        projectImageId: "",
        projectPrevImage: "",
      });
    }
  }
  const handleEditProject = (index) => {
    setEditingIndex(index);
    setNewProject(projects[index]);
    setOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Section Title */}
      {errors.projects && <p className="text-red-500">{errors.projects}</p>}
      {/* Clickable Area for Adding a Project */}
      <div
        className="cursor-pointer p-5 bg-violet-500 hover:bg-violet-600 rounded-lg text-white text-center mt-6"
        onClick={() => {
          setEditingIndex(null); // Reset editingIndex
          setNewProject({
            projectTitle: "",
            projectImage: "",
            projectTempImage: null,
            projectDescription: "",
            projectLiveLink: "",
            projectImageId: "",
            projectPrevImage: null,
          });
          setOpen(true);
        }}
      >
        <PlusCircle size={18} className="inline-block mr-2" /> Add New Project
      </div>
      {/* Project Cards */}
     <div className="flex justify-center items-center">
     <div className="flex flex-col space-y-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="p-5 max-w-[80vw] md:max-w-screen bg-white flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6"
          >
            {project.projectImage && (
              <div className="relative w-full md:w-48  md:h-auto">
                <img
                  src={project.projectImage}
                  alt={project.projectTitle}
                  className="h-32 w-48  object-cover rounded-md"
                />
              </div>
            )}
            {project.projectPrevImage && (
              <div className="relative w-full md:w-48 h-48 md:h-auto">
                <img
                  src={project.projectPrevImage}
                  alt={project.projectPrevImage}
                  className="h-32 w-48 object-cover rounded-md"
                />
              </div>
            )}
            <div className="flex flex-col justify-between mt-4 md:mt-0">
              <h4 className="text-2xl font-semibold text-gray-700">
                {project.projectTitle}
              </h4>
              <p className="text-gray-500 mt-2 break-words">{project.projectDescription}</p>
              
              <Link
                href={project.projectLiveLink}
                className="text-violet-600 hover:text-violet-800 font-medium mt-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Preview
              </Link>
              <div className="flex space-x-4 mt-4">
                <Button
                  variant="secondary"
                  size="sm"
                  type="button"
                  className="flex items-center gap-2"
                  onClick={() => handleEditProject(index)}
                >
                  <Edit size={16} /> Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  type="button"
                  className="flex items-center gap-2"
                  onClick={() => handleRemoveProject(index)}
                >
                  <Trash2 size={16} /> Remove
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
     </div>

      {/* Add/Edit Project Dialog */}
      <Dialog
        open={open}
        onOpenChange={() => {
          setProjectErrors({});
        }}
      >
        <DialogContent className="max-w-4xl space-y-6 p-6 sm:p-8 overflow-y-auto max-h-[90vh] scrollbar-hide">
          <DialogHeader>
            <DialogTitle className="text-violet-700 text-2xl font-semibold text-center sm:text-left">
              {editingIndex !== null ? "Edit Project" : "Add Project"}
            </DialogTitle>
          </DialogHeader>

          {/* Form Inputs */}
          <div className="space-y-6">
            {/* First row of fields: Project Title and Live Link */}
            <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0">
              {/* Project Title */}
              <div className="flex-1">
                <Label className="font-bold text-gray-700">
                  Project Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Enter project title"
                  value={newProject.projectTitle}
                  onChange={(e) =>
                    setNewProject((prev) => ({
                      ...prev,
                      projectTitle: e.target.value,
                    }))
                  }
                  className="mt-2 w-full"
                />
                {projectErrors.projectTitle && (
                  <p className="text-red-500 text-xs mt-1">
                    {projectErrors.projectTitle}
                  </p>
                )}
              </div>

              {/* Project Live Link */}
              <div className="flex-1">
                <Label className="font-bold text-gray-700">
                  Live Project Link <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="https://www.example.com"
                  value={newProject.projectLiveLink}
                  onChange={(e) =>
                    setNewProject((prev) => ({
                      ...prev,
                      projectLiveLink: e.target.value,
                    }))
                  }
                  className="mt-2 w-full"
                />
                {projectErrors.projectLiveLink && (
                  <p className="text-red-500 text-xs mt-1">
                    {projectErrors.projectLiveLink}
                  </p>
                )}
              </div>
            </div>

            {/* Project Image */}
            <div>
              <Label className="font-bold text-gray-700">
                Project Image <span className="text-red-500">*</span>
              </Label>
              <div className="mt-2">
                {newProject.projectPrevImage && (
                  <div className="relative w-full sm:w-48 h-48 sm:h-auto">
                    <img
                      src={newProject.projectPrevImage}
                      alt={newProject.projectPrevImage}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                )}
                {newProject.projectImage ? (
                  <div className="mt-4 flex flex-col items-start">
                    <img
                      src={newProject.projectImage}
                      className="h-32 w-48 object-cover"
                    />
                    <Button
                      type="button"
                      onClick={() =>
                        handleRemoveProjectImage(newProject.projectImageId)
                      }
                      className="mt-2 bg-red-600 text-white px-3 py-1 text-xs rounded hover:bg-red-700"
                    >
                      Delete Image
                    </Button>
                  </div>
                ) : (
                  <div className="mt-4">
                    <Button
                      className="bg-violet-600 hover:bg-violet-700 w-full sm:w-auto"
                      onClick={() =>
                        document.getElementById("image-upload").click()
                      }
                    >
                      Upload Image
                    </Button>
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      className="hidden"
                      onChange={async (event) => {
                        const file = event.target.files[0];
                        event.target.value = "";
                        if (!file) {
                          toast({ title: "Please select an image to upload." });
                          return;
                        }
                        const fileReader = new FileReader();
                        fileReader.onload = () =>
                          setNewProject((prev) => ({
                            ...prev,
                            projectTempImage: file,
                            projectPrevImage: fileReader.result,
                          }));
                        fileReader.readAsDataURL(file);
                      }}
                    />
                  </div>
                )}
              </div>
              {projectErrors.projectPrevImage && (
                <p className="text-red-500 text-xs mt-1">
                  {projectErrors.projectPrevImage}
                </p>
              )}
            </div>

            {/* Project Description */}
            <div>
              <Label className="font-bold text-gray-700">
                Project Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                placeholder="Enter project description"
                value={newProject.projectDescription}
                onChange={(e) =>
                  setNewProject((prev) => ({
                    ...prev,
                    projectDescription: e.target.value,
                  }))
                }
                className="mt-2 w-full"
              />
              <p className="text-gray-400 text-xs mt-1 text-center ">
                Note: Sentences ending with a full stop will be displayed as bullet points on the portfolio website and resume.
              </p>
              {projectErrors.projectDescription && (
                <p className="text-red-500 text-xs mt-1">
                  {projectErrors.projectDescription}
                </p>
              )}
            </div>
          </div>

          {/* Dialog Footer */}
          <DialogFooter className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <Button
              className="bg-violet-600 hover:bg-violet-700 w-full sm:w-auto"
              onClick={handleAddProject}
            >
              {editingIndex !== null ? "Update" : "Save"}
            </Button>

            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => {
                setProjectErrors({});
                editingIndex !== null
                  ? validateProject()
                    ? setOpen(false)
                    : setOpen(true)
                  : setOpen(false);
              }}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Projects;
