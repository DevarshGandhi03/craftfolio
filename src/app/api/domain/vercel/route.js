import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  const { domain } = await req.json();

  try {
    const response = await axios.post(
      `https://api.vercel.com/v9/projects/prj_XYA61B9nxfbG02wNeW6DsUIYKkcm/domains`,
      { name: domain },
      {
        headers: {
          Authorization: `Bearer lvFAHVl3Ei8kJmJuvYREsvz8`,
        },
      }
    );

    return NextResponse.json({ message: "Domain added to Vercel", data: response.data });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add domain to Vercel" }, { status: 500 });
  }
}
