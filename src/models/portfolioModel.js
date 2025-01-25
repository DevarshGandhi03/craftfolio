import mongoose from "mongoose";
import User from "./userModel";

const PortfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId,User },
  fullName: {
    type: String,
    trim: true,
    required: true,
  },
  userImage: {
    type: String,
    trim: true,
    required: true,
  },
  userImageId: {
    type: String,
    trim: true,
    required: true,
  },
  userTitle: {
    type: String,
    trim: true,
    required: true,
  },
  userDescription: {
    type: String,
    trim: true,
    required: true,
  },
  projects: [
    {
      projectTitle: String,
      projectImage: String,
      projectDescription: String,
      projectLiveLink: String,
      projectImageId: String,
      
    },
  ],
  education: [
    {
      instituteName: String,
      degree: String,
      from: String,
      to: String,
    },
  ],
  about: {
    type: String,
    trim: true,
    required: true,
  },
  contactMessages: [
    {
      sendersName: String,
      sendersEmail: String,
      sendersMessage: String,
    },
  ],
  jobExperiences: [
    {
      companyName: String,
      city: String,
      state: String,
      jobTitle: String,
      jobDescription: String,
      from: String,
      to: String,
      present: Boolean,
    },
  ],
  github: {
    type: String,
    trim: true,
  },
  linkedin: {
    type: String,
    trim: true,
  },
  twitter: {
    type: String,
    trim: true,
  },
  instagram: {
    type: String,
    trim: true,
  },
  phoneNo: {
    type: String,
    trim: true,
  },
  skills: [
    {
      type: String,
      trim: true,
    },
  ],
  resume: {
    type: String,
    trim: true,
  },
  resumeId: {
    type: String,
    trim: true,
  },
  hashnodeUsername: {
    type: String,
    trim: true,
  },
  portfolioTheme: String,
  resumeTheme: String,
  isPublished: Boolean,
});

const Portfolio =
  mongoose.models.Portfolio || mongoose.model("Portfolio", PortfolioSchema);
export default Portfolio;
