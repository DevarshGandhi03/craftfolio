import connectToDb from "@/db/db";
import { apiResponse } from "@/helpers/apiResponse";
import Portfolio from "@/models/portfolioModel";

export async function GET(request) {
  await connectToDb();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("id");

    const userPortfolioDetails = await Portfolio.findOne({userId});
    //   console.log(user);

    if (!userPortfolioDetails) {
      return apiResponse({
        message: "Portfolio details not found!",
        statusCode: 400,
        success: false,
      });
    }

    return apiResponse({
      message: "User portfolio details fetched sucessfully!",
      statusCode: 200,
      success: true,
      data: userPortfolioDetails,
    });
  } catch (error) {
    return apiResponse({
      message: "Error occoured while fetching user portfolio details",
      statusCode: 400,
      success: false,
      data: error,
    });
  }
}
