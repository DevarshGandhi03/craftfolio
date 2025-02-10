import connectToDb from "@/db/db";
import { apiResponse } from "@/helpers/apiResponse";
import { sendVerificationEmail } from "@/helpers/mailer";
import User from "@/models/userModel.js";

export async function POST(request) {
  await connectToDb();
  try {
    const { email } = await request.json();
    if (!email) {
      return apiResponse({
        message: "Please enter your email.",
        statusCode: 400,
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const user = await User.findOne({ email });

    if (!(user && user.isVerified)) {
      return apiResponse({
        message: "User not found! Signup to create your account",
        statusCode: 400,
      });
    }
    if (user?.resendVerifyOtpExpiry > Date.now()) {
        return apiResponse({
          message: "OTP already sent please try again after 1 minutes",
          statusCode: 400,
          success: false,
        });
      }

    const verifyOtpExpiry = Date.now() + 300000;
    const resendVerifyOtpExpiry = Date.now() + 100000;

    user.verifyOtp=otp;
    user.verifyOtpExpiry=verifyOtpExpiry;
    user.resendVerifyOtpExpiry=resendVerifyOtpExpiry;
    await user.save();

    const response = await sendVerificationEmail(email, otp);

    if (response.success) {
      return apiResponse({
        message: "Please verify your otp.",
        success: true,
        statusCode: 200,
      });
    } else {
      return apiResponse({
        message: "Signin failed, Please try again!",
        error,
        success: false,
        statusCode: 400,
      });
    }



  } catch (error) {
    return apiResponse({
      message: "Signin failed, Please try again!",
      error,
      success: false,
      statusCode: 400,
    });
  }
}
