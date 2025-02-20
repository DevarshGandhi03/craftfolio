import connectToDb from "@/db/db";
import { apiResponse } from "@/helpers/apiResponse";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";

export async function POST(request) {
  await connectToDb();

  const { email, otp } = await request.json();

  const user = await User.findOne({ email });

  if (!user) {
    return apiResponse({
      success: false,
      message: "User not found.",
      statusCode: 400,
    });
  }

  if (user.verifyOtp === otp && user.verifyOtpExpiry > Date.now()) {
    user.isVerified = true;
    user.resendVerifyOtpExpiry = undefined;
    await user.save();
    const accessToken = jwt.sign(
            {
              _id: user._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
          );
    
          const expires = new Date();
          expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000);
    
          const headers = new Headers();
          headers.append(
            "Set-Cookie",
            `token=${accessToken}; Path=/; Expires=${expires.toUTCString()}; HttpOnly; SameSite=Strict`
          );
    return apiResponse({
      success: true,
      message: "Account created successfully",
      statusCode: 200,
      data: user,
      headers: headers,
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
