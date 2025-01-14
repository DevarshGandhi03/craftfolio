import connectToDb from "@/db/db";
import { apiResponse } from "@/helpers/apiResponse";
import User from "@/models/userModel";

export async function GET(request) {
  await connectToDb();

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const user = await User.findById(id).select(
      "-verifyOtp -verifyOtpExpiry -resendVerifyOtpExpiry "
    );

    //   console.log(user);

    if (!user || !user.isVerified) {
      return apiResponse({
        message: "User not found!",
        statusCode: 400,
        success: false,
      });
    }

    return apiResponse({
      message: "User details fetched sucessfully!",
      statusCode: 200,
      success: true,
      data: user,
    });
  } catch (error) {
    return apiResponse({
      message: "Error occoured while fetching user details",
      statusCode: 400,
      success: false,
      data: error,
    });
  }
}
