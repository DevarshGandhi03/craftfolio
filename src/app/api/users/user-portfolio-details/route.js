import User from "@/models/userModel";
import connectToDb from "@/db/db";
import { apiResponse } from "@/helpers/apiResponse";
import Portfolio from "@/models/portfolioModel";

export async function POST(request) {
  await connectToDb();

  try {
    const {
      userId,
      fullName,
      userImage,userImageId,
      userTitle,
      userDescription,
      projects,
      about,
      jobExperiences = [],
      github = "",
      linkedin = "",
      twitter = "",
      instagram = "",
      phoneNo,
      skills = [],
      resume,
      education,
    } = await request.json();

    

    const user = await User.findOne({ _id: userId });
    const userPortfolioDetails = await Portfolio.findOne({ userId });

    if (!user) {
      return apiResponse({
        message: "User not found.",
        success: false,
        statusCode: 400,
      });
    }
    if (userPortfolioDetails) {
      return apiResponse({
        message: "User portfolio details already exists",
        success: false,
        statusCode: 400,
      });
    }

    if (
      !(
        userId &&
        fullName &&
        userImage &&
        userTitle &&
        userDescription &&
        projects &&
        about &&
        education
      )
    ) {
      return apiResponse({
        message: "Please enter all required information.",
        success: false,
        statusCode: 400,
      });
    }
    if (
      fullName.replace(/ /g, "").length == 0 ||
      userId.replace(/ /g, "").length == 0 ||
      userImage.replace(/ /g, "").length == 0 ||
      userTitle.replace(/ /g, "").length == 0 ||
      userDescription.replace(/ /g, "").length == 0 ||
      about.replace(/ /g, "").length == 0
    ) {
      return apiResponse({
        message: "Please enter all required information.",
        success: false,
        statusCode: 400,
      });
    }

    if (projects) {
      if (projects.length == 0) {
        return apiResponse({
          message: "Please enter all required projects details.",
          success: false,
          statusCode: 400,
        });
      }
      for (let i = 0; i < projects.length; i++) {
        if (
          !(
            projects[i].projectTitle &&
            projects[i].projectImage &&
            projects[i].projectDescription
          )
        ) {
          return apiResponse({
            message: "Please enter all required projects details.",
            success: false,
            statusCode: 400,
          });
        }
      }
    }
    
    if (jobExperiences) {
      for (let i = 0; i < jobExperiences.length; i++) {
        if (
          !(
            jobExperiences[i].companyName &&
            jobExperiences[i].city &&
            jobExperiences[i].state &&
            jobExperiences[i].jobTitle &&
            jobExperiences[i].from &&
            jobExperiences[i].jobDescription &&
            (jobExperiences[i].to || jobExperiences[i].present)
          )
        ) {
          return apiResponse({
            message: "Please enter all required job details.",
            success: false,
            statusCode: 400,
          });
        }
      }
    }
    if (education) {
      if (education.length == 0) {
        return apiResponse({
          message: "Please enter all required education details",
          success: false,
          statusCode: 400,
        });
      }
      for (let i = 0; i < education.length; i++) {
        if (
          !(
            education[i].instituteName &&
            education[i].degree &&
            education[i].degree &&
            education[i].to
          )
        ) {
          return apiResponse({
            message: "Please enter all required education details",
            success: false,
            statusCode: 400,
          });
        }
      }
    }
   

    const portfolioDetails = new Portfolio({
      userImageId,
      userId,
      fullName,
      userImage,
      userTitle,
      userDescription,
      projects,
      about,
      jobExperiences,
      github,
      linkedin,
      twitter,
      instagram,
      phoneNo,
      skills,
      resume,
      education,
    });

    await portfolioDetails.save();

    if (portfolioDetails) {
      return apiResponse({
        message: "Congratulations! Portfolio details uploaded successfully !",
        statusCode: 201,
        success: true,
        data: portfolioDetails,
      });
    }
  } catch (error) {
    return apiResponse({
      message: "Error occoured while registering user portfolio details",
      statusCode: 400,
      success: false,
      data: error,
    });
  }
}
