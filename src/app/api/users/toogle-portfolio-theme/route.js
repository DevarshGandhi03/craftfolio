import { apiResponse } from "@/helpers/apiResponse";
import connectToDb from "@/db/db";
import Portfolio from "@/models/portfolioModel";

export async function POST (request){
    await connectToDb();

    try {
        const {portfolio_id,portfolioTheme}= await request.json()
    
        const portfolio_details=await Portfolio.findOne({_id:portfolio_id})
    
        if (!portfolio_details) {
            return apiResponse({message:"User portfolio does not exist",success:false,statusCode:401});
        }
    
        portfolio_details.portfolioTheme=portfolioTheme
        await portfolio_details.save()
    
        return apiResponse({message:"Portfolio website theme updated!",success:true,statusCode:201});
    
    } catch (error) {
            return apiResponse({message:"Something went wrong! Theme updation failed ",success:false,statusCode:401});
        
    }
}