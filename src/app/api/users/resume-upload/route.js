import path from "path";
import { writeFile } from "fs/promises";
import connectToDb from "@/db/db";
import { uploadOnCloudinary } from "@/helpers/cloudinary";
import { apiResponse } from "@/helpers/apiResponse";

export const POST = async (req) => {
  connectToDb();

  const formData = await req.formData();

  const file = formData.get("file");
  if (!file) {
    return apiResponse({
      message: "File not found!",
      statusCode: 400,
      success: false,
    });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = file.name.replaceAll(" ", "_");
  const filePath = path.join(process.cwd(), "public/uploads", filename);
  //   console.log(filePath);

  try {
    await writeFile(filePath, buffer);
    
    // console.log("This image is supported!");
    const response = await uploadOnCloudinary(filePath);

    return apiResponse({
      message: "Resume uploaded !",
      statusCode: 200,
      data: response.url,
    });
  } catch (error) {
    console.log("Error occured ", error);
    return apiResponse({
      message: "Error occoured while uploading user resume !",
      statusCode: 400,
      error,
    });
  }
};
