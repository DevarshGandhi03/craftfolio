import { apiResponse } from "@/helpers/apiResponse";
import { deleteMediaFromCloudinary } from "@/helpers/cloudinary";

export async function POST(request){
    const {public_id}=await request.json()
    deleteMediaFromCloudinary(public_id);
    return apiResponse({message:"File deleted",statusCode:200,success:true})
}