import connectToDb from "@/db/db";
import { apiResponse } from "@/helpers/apiResponse";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request) {
  await connectToDb();

  try {
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

      // const cookieStore = await cookies();
      // cookieStore.set({
      //   name: "token",
      //   value: accessToken,
      //   httpOnly: true,
      // });

      return apiResponse({
        success: true,
        message: "Logged in successfully!",
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
  } catch (error) {
    return apiResponse({
      message: "Signin failed, Please try again!",
      error,
      success: false,
      statusCode: 400,
    });
  }
}
