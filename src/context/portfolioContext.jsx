"use client";

import Loading from "@/components/Loading";
import { AuthContext } from "@/context/authContext";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

export const PortfolioContext = React.createContext(null);

function PortfolioProvider({ children }) {
  const url = useRouter();
  const {
    user,
    setIsSubmitted,
    isSubmitted,
    userPortfolioDetails,
    calledOnce,
    setCalledOnce,
  } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [resumeTheme, setResumeTheme] = useState("theme_1");
  const [fullName, setFullname] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userTitle, setUserTitle] = useState("");
  const [about, setAbout] = useState("");
  const [education, setEducation] = useState([]);
  const [jobExperiences, setJobExperiences] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [skills, setSkills] = useState([]);
  const [userImageId, setUserImageId] = useState("");
  const [userImage, setUserImage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState();
  const [imageLoading, setImageLoading] = useState(true);
  const [projectLoading, setProjectLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [editForm, setEditForm] = useState(true);
  const [socialLinks, setSocialLinks] = useState({
    github: "",
    linkedin: "",
    twitter: "",
    instagram: "",
  });
  const router = useRouter();
  function setUserPortfolioDetails() {
    if (isSubmitted && userPortfolioDetails) {
      setProjects(userPortfolioDetails.projects);
      setFullname(userPortfolioDetails.fullName);
      setUserDescription(userPortfolioDetails.userDescription);
      setUserTitle(userPortfolioDetails.userTitle);
      setUserImage(userPortfolioDetails.userImage);
      setUserImageId(userPortfolioDetails.userImageId);
      setEducation(userPortfolioDetails.education);
      if (userPortfolioDetails.jobExperiences) {
        setJobExperiences(userPortfolioDetails.jobExperiences);
      }
      setSkills(userPortfolioDetails.skills);
      setSocialLinks({
        ...socialLinks,
        github: userPortfolioDetails.github || "",
        linkedin: userPortfolioDetails.linkedin || "",
        twitter: userPortfolioDetails.twitter || "",
        instagram: userPortfolioDetails.instagram || "",
      });
      if (userPortfolioDetails.phoneNo) {
        setPhoneNumber(userPortfolioDetails.phoneNo);
      }
      setAbout(userPortfolioDetails.about);
    }
  }
  const [errors, setErrors] = useState({});
  const validateForm = (steps) => {
    const validationErrors = {};
    if (steps == 0) {
      if (!fullName.trim())
        validationErrors.fullName = "Full Name is required.";
      if (!userTitle.trim())
        validationErrors.userTitle = "User Title is required.";
      if (!userDescription.trim())
        validationErrors.userDescription = "User Description is required.";
      if (
        !(
          (image && (typeof image === "string" ? isValidURL(image) : true)) ||
          (userImage &&
            (typeof userImage === "string" ? isValidURL(userImage) : true))
        )
      ) {
        validationErrors.userImage = "A valid user image is required.";
      }
      if (!about.trim()) validationErrors.about = "About section is required.";
      if (!phoneNumber.toString().trim())
        validationErrors.phoneNumber = "Phone number is required.";
      else if (!/^\d{10}$/.test(phoneNumber))
        validationErrors.phoneNumber = "Phone number must be 10 digits.";
    }
    if (steps == 4) {
      if (skills.length === 0)
        validationErrors.skills = "Please add at least one skill.";

      if (socialLinks.github && !isValidURL(socialLinks.github))
        validationErrors.github = "Invalid GitHub URL.";
      if (socialLinks.linkedin && !isValidURL(socialLinks.linkedin))
        validationErrors.linkedin = "Invalid LinkedIn URL.";
      if (socialLinks.twitter && !isValidURL(socialLinks.twitter))
        validationErrors.twitter = "Invalid Twitter URL.";
      if (socialLinks.instagram && !isValidURL(socialLinks.instagram))
        validationErrors.instagram = "Invalid Instagram URL.";
    }
    if (steps == 1) {
      if (projects.length === 0)
        validationErrors.projects = "Please add at least one project.";
    }

    if (steps == 2) {
      if (projects.length === 0)
        if (education.length === 0)
          validationErrors.education =
            "Please add at least one education detail.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };
  const isValidURL = (string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };
  async function handleProjectImageUpload() {
    const newProjectArr = await Promise.all(
      projects.map(async (project, i) => {
        if (project.projectImage) {
          return project;
        }
        const file = project.projectTempImage;
        const formData = new FormData();
        const uniqueFile = new File([file], `${Date.now()}-${file.name}`, {
          type: file.type,
        });

        formData.append("file", uniqueFile);
        try {
          const response = await axios.post(
            `/api/users/user-image-upload`,
            formData
          );

          delete project.projectTempImage;
          delete project.projectPrevImage;
          return {
            ...project,
            projectImage: response.data.data.url,
            projectImageId: response.data.data.public_id,
          };
        } catch (error) {
          toast({ title: "Failed to upload image project." });
        }
      })
    );

    setProjects(newProjectArr);
    setProjectLoading(false);
  }

  async function handleImageUpload(file) {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(
        `/api/users/user-image-upload`,
        formData
      );
      setUserImage(response.data.data.url);
      setUserImageId(response.data.data.public_id);
      setImage(null);
    } catch (error) {
      toast({
        title: "Failed to upload user image.",
      });
    } finally {
      setImageLoading(false);
    }
  }

  async function handleRemoveImage(publicId) {
    const response = await axios.post("/api/users/remove-file", {
      public_id: publicId,
    });
    return response;
  }

  useEffect(() => {
    if (!calledOnce) {
      uploadPortfolio();
    }
  }, [imageLoading, projectLoading]);
  useEffect(() => {
    setUserPortfolioDetails();
  }, [isSubmitted]);
  useEffect(() => {
    if (!editForm) {
      updatePortfolio();
    }
  }, [imageLoading, projectLoading]);

  async function uploadPortfolio() {
    if (!imageLoading && !projectLoading) {
      const response = await axios.post("/api/users/user-portfolio-details", {
        userName: user.username,
        userId: user._id,
        fullName,
        projects,
        userDescription,
        userTitle,
        userImage,
        userImageId,
        jobExperiences,
        skills,
        education,
        about,
        github: socialLinks.github,
        linkedin: socialLinks.linkedin,
        instagram: socialLinks.instagram,
        twitter: socialLinks.twitter,
        phoneNo: phoneNumber,
      });
      toast({
        title: "Success",
        description: "Your details have been submitted successfully.",
        icon: "✅", // Adds a success icon for better context
        className: "bg-green-600 text-white", // Subtle and professional green shade
      });

      setCalledOnce(true);
      setIsSubmitted(true);
      setPageLoading(false);
      setCurrentStep(0)
      router.push("/dashboard/portfolio");
    }
  }
  async function updatePortfolio() {
    if (!imageLoading && !projectLoading) {
      const response = await axios.post("/api/users/update-portfolio-details", {
        portfolioId: userPortfolioDetails._id,
        fullName,
        projects,
        userDescription,
        userTitle,
        userImage,
        userImageId,
        jobExperiences,
        skills,
        education,
        about,
        github: socialLinks.github,
        linkedin: socialLinks.linkedin,
        instagram: socialLinks.instagram,
        twitter: socialLinks.twitter,
        phoneNo: phoneNumber,
      });
      toast({
        title: "Success",
        description: "Your details have been updated successfully.",
        className: "bg-green-600 text-white",
      });

      setPageLoading(false);
      url.refresh();
      setImageLoading(true);
      setEditForm(true);
      setProjectLoading(true);
      setCurrentStep(0)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm(4)) {
      toast({
        title: "Please enter all required fields.",
        variant: "destructive",
      });
      return;
    }
    setPageLoading(true);
    if (image) {
      await handleImageUpload(image);
    } else {
      setImageLoading(false);
    }

    await handleProjectImageUpload();
  }

  return (
    <PortfolioContext.Provider
      value={{
        user,
        projects,
        setProjects,
        fullName,
        setFullname,
        userDescription,
        setUserDescription,
        userTitle,
        setUserTitle,
        about,
        setAbout,
        education,
        setEducation,
        jobExperiences,
        setJobExperiences,
        skills,
        setSkills,
        userImageId,
        setUserImageId,
        userImage,
        setUserImage,
        validateForm,
        isValidURL,
        errors,
        setErrors,
        socialLinks,
        setSocialLinks,
        handleRemoveImage,
        phoneNumber,
        setPhoneNumber,
        handleSubmit,
        setImage,
        image,
        editForm,
        setEditForm,
        setResumeTheme,
        resumeTheme,currentStep, setCurrentStep
      }}
    >
      {pageLoading ? <Loading /> : children}
    </PortfolioContext.Provider>
  );
}

export default PortfolioProvider;
