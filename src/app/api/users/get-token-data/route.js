import { apiResponse } from "@/helpers/apiResponse";
import jwt from "jsonwebtoken";

export async function POST(request) {
  const token  = await request.json();
    
    
  if (!token) {
    return apiResponse({
      message: "Access token not found!",
      statusCode: 400,
      success: false,
    });
  }

  const data = jwt.verify(token.value, process.env.JWT_SECRET);
  

  return apiResponse({
    message: "User authenticated successfully!",
    statusCode: 200,
    success: true,
    data:data
  });

}
