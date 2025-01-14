import connectToDb from "@/db/db";
import { apiResponse } from "@/helpers/apiResponse";
import User from "@/models/userModel";

export async function POST(request) {
  await connectToDb();

  const { email, otp } = await request.json();

  const user = await User.findOne({ email });

  if (!user) {
    return apiResponse({
      message: "User not found.",
      statusCode: 400,
    });
  }

  if (user.verifyOtp === otp && user.verifyOtpExpiry > Date.now()) {
    user.isVerified = true;
    await user.save();
    return apiResponse({
      success: true,
      message: "Account verified successfully",
      statusCode: 200,
    });
  } else if (!(user.verifyOtpExpiry > Date.now())) {
    // Code has expired
    return apiResponse({
      success: false,
      message:
        "Verification code has expired. Please sign up again to get a new code.",
      statusCode: 400,
    });
  } else {
    return apiResponse({
      success: false,
      message: "Incorrect verification code",
      statusCode: 400,
    });
  }
}
