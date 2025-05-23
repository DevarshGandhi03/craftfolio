import path from "path";
import { writeFile } from "fs/promises";
import connectToDb from "@/db/db";
import { validateMIMEType } from "validate-image-type";
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
    const result = await validateMIMEType(filePath, {
      allowMimeTypes: [
        "image/jpeg",
        "image/jpeg",
        "image/gif",
        "image/png",
        "image/svg+xml",
      ],
    });

    if (!result.ok) {
      return apiResponse({
        message: "Incorrect image format !",
        statusCode: 400,
        error: result.error,
      });
    }
    // console.log("This image is supported!");
    const response = await uploadOnCloudinary(filePath);

    return apiResponse({
      message: "User image uploaded !",
      statusCode: 200,
      data: response.url,
    });
  } catch (error) {
    console.log("Error occured ", error);
    return apiResponse({
      message: "Error occoured while uploading user image !",
      statusCode: 400,
      error,
    });
  }
};
