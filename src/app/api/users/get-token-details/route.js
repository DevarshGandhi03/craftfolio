import connectToDb from "@/db/db";
import { apiResponse } from "@/helpers/apiResponse";
import jwt from "jsonwebtoken"
export async function GET(request) {
  await connectToDb();

  try {

    const token = await request.cookies()
console.log(token);



  } catch (error) {
    return apiResponse({
      message: "Error occoured while fetching token details",
      statusCode: 400,
      success: false,
      data: error,
    });
  }
}
