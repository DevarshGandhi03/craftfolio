import { apiResponse } from "@/helpers/apiResponse";
import connectToDb from "@/db/db";
import Portfolio from "@/models/portfolioModel";

export async function POST(request) {
  await connectToDb();

 try {
     const updatedPortfolioDetails = await request.json();
     
   
     const portfolio_details = await Portfolio.findOne({
       _id: updatedPortfolioDetails.portfolioId,
     });
   
     if (!portfolio_details) {
       return apiResponse({
         message: "User portfolio does not exist",
         success: false,
         statusCode: 401,
       });
     }
     if (updatedPortfolioDetails.fullName && updatedPortfolioDetails.fullName.replace(/ /g, "").length == 0) {
        return apiResponse({
            message: "Please enter all required information.",
            success: false,
            statusCode: 400,
          });
     }
     if (updatedPortfolioDetails.userImage && updatedPortfolioDetails.userImage.replace(/ /g, "").length == 0) {
        return apiResponse({
            message: "Please enter all required information.",
            success: false,
            statusCode: 400,
          });
     }
     if (updatedPortfolioDetails.userTitle && updatedPortfolioDetails.userTitle.replace(/ /g, "").length == 0) {
        return apiResponse({
            message: "Please enter all required information.",
            success: false,
            statusCode: 400,
          });
     }
     if (updatedPortfolioDetails.userDescription && updatedPortfolioDetails.userDescription.replace(/ /g, "").length == 0) {
        return apiResponse({
            message: "Please enter all required information.",
            success: false,
            statusCode: 400,
          });
     }
     if (updatedPortfolioDetails.about && updatedPortfolioDetails.about.replace(/ /g, "").length == 0) {
        return apiResponse({
            message: "Please enter all required information.",
            success: false,
            statusCode: 400,
          });
     }
   
     if (updatedPortfolioDetails.projects) {
       if (updatedPortfolioDetails.projects.length == 0) {
         return apiResponse({
           message: "Please enter all required projects details.",
           success: false,
           statusCode: 400,
         });
       }
       for (let i = 0; i < updatedPortfolioDetails.projects.length; i++) {
         if (
           !(
             updatedPortfolioDetails.projects[i].projectTitle &&
             updatedPortfolioDetails.projects[i].projectImage &&
             updatedPortfolioDetails.projects[i].projectDescription
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
     if (updatedPortfolioDetails.jobExperiences) {
       for (let i = 0; i < updatedPortfolioDetails.jobExperiences.length; i++) {
         if (
           !(
             updatedPortfolioDetails.jobExperiences[i].companyName &&
             updatedPortfolioDetails.jobExperiences[i].city &&
             updatedPortfolioDetails.jobExperiences[i].state &&
             updatedPortfolioDetails.jobExperiences[i].jobTitle &&
             updatedPortfolioDetails.jobExperiences[i].from &&
             updatedPortfolioDetails.jobExperiences[i].jobDescription &&
             (updatedPortfolioDetails.jobExperiences[i].to ||
               updatedPortfolioDetails.jobExperiences[i].present)
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
     if (updatedPortfolioDetails.education) {
       if (updatedPortfolioDetails.education.length == 0) {
         return apiResponse({
           message: "Please enter all required education details",
           success: false,
           statusCode: 400,
         });
       }
       for (let i = 0; i < updatedPortfolioDetails.education.length; i++) {
         if (
           !(
             updatedPortfolioDetails.education[i].instituteName &&
             updatedPortfolioDetails.education[i].degree &&
             updatedPortfolioDetails.education[i].degree &&
             updatedPortfolioDetails.education[i].to
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
   
     const response = await Portfolio.findByIdAndUpdate(
       updatedPortfolioDetails.portfolioId,
       updatedPortfolioDetails,
       { new: true }
     );
   
     if (response) {
       return apiResponse({
         message: "Congratulations! Portfolio details updated successfully !",
         statusCode: 201,
         success: true,
         data: response,
       });
     }
 } catch (error) {
    return apiResponse({
        message: "Error occoured while updating user portfolio details",
        statusCode: 400,
        success: false,
        data: error,
      });
 }
}
