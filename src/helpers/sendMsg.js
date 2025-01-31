import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  port: 465,
  auth: {
    user: "devarsh600@gmail.com",
    pass: process.env.RESEND_API_KEY,
  },
});

export async function sendMsgEmail(
  email,
  messageObj,
  username
) {
  // send mail with defined transport object
  try {
    const info = await transporter.sendMail({
      from: '"CraftFolio" <devarsh600@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "CraftFolio || New message", // Subject line
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form Reply</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            font-size: 24px;
            color: #333;
            margin-bottom: 20px;
        }
        .content {
            font-size: 16px;
            line-height: 1.6;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 14px;
            color: #777;
        }
        .footer a {
            color: #007BFF;
            text-decoration: none;
        }
        .highlight {
            font-weight: bold;
            color: #007BFF;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
        </div>
        <div class="content">
            <p>Dear <span class="highlight">${username}</span>,</p>
            <p>You have a new message.</p>

            <p><strong>Sender Name:</strong> ${messageObj.sendersName}</p>
            <p><strong>Email Address:</strong> ${messageObj.sendersEmail}</p>
            <p><strong>Message: ${messageObj.sendersMessage}</strong></p>

        </div>
        <div class="footer">
            <p>&copy; 2025 CraftFolio. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`,
    });
    // console.log("Message sent: %s", info.messageId);
    return { success: true, message: "Verification email sent successfully" };
  } catch (error) {
    console.log("Error occoured while sending email");

    return { success: false, message: "Something wrong occoured while sending email" };
  }
}
