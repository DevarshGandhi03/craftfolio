import { NextResponse } from "next/server";

export function apiResponse({message,data,statusCode,success,error=null,headers}){
    const response={
        message,statusCode
    }
    if (data) {
        response.data=data;
    }
    if (success) {
        response.success=success;
    }
    if (error) {
        response.error=error
    }

    return NextResponse.json(response,{status:statusCode,headers})
}