import connectToDb from "@/db/db";
import { apiResponse } from "@/helpers/apiResponse";
import { sendVerificationEmail } from "@/helpers/mailer";
import { SendMailMsg, sendMsgEmail } from "@/helpers/sendMsg";
import Portfolio from "@/models/portfolioModel";
import User from "@/models/userModel";
import { data } from "autoprefixer";

export async function POST(request) {
  try {
    const { username, sendersName, sendersEmail, sendersMessage } =
      await request.json();

    const user = await User.findOne({ username });

    if (!user) {
      return apiResponse({
        message: "User not found.",
        statusCode: 400,
      });
    }
    if (!user.isVerified) {
      return apiResponse({
        message: "User not verified.",
        statusCode: 400,
      });
    }
    const email = user.email;
    const userId = user._id;
    const portfolio = await Portfolio.findOne({ userId });

    const messageObj = {
      sendersEmail,
      sendersName,
      sendersMessage,
    };

    portfolio.contactMessages = [...portfolio.contactMessages, messageObj];
    const res = await portfolio.save();

    const msgResponse = await sendMsgEmail(email, messageObj, username);

    if (msgResponse.success) {
      return apiResponse({
        message: "Message sent successfully.",
        statusCode: 201,
        success: true,
      });
    } else {
      return apiResponse({
        message: "Something went wrong!",
        statusCode: 401,
        success: false,
      });
    }
  } catch (error) {
    return apiResponse({
      message: "Something went wrong!",
      statusCode: 401,
      success: false,
    });
  }
}
