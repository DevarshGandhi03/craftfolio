import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  const { domain } = await req.json();

  try {
    const response = await axios.post(
      `https://api.vercel.com/v9/projects/${process.env.VERCEL_PROJECT_ID}/domains`,
      { name: domain },
      {
        headers: {
          Authorization: `Bearer ${process.env.VERCEL_API_KEY}`,
        },
      }
    );

    return NextResponse.json({ message: "Domain added to Vercel", data: response.data });
  } catch (error) {
    console.log(error);
    
    return NextResponse.json({ error: "Failed to add domain to Vercel" }, { status: 500 });
  }
}
