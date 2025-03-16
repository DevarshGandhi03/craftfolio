import connectToDb from "@/db/db";
import Domain from "@/models/domainModel";
import { NextResponse } from "next/server";


export async function POST(req) {
  await connectToDb();
  const { username, customDomain } = await req.json();
  
  const domainObj=await Domain.findOne({username})
  console.log(domainObj);
  
  
  if (domainObj?.status) {
    return NextResponse.json({ message: "Domain already exists" }, { status: 400 });
  }
  
  
  if (!customDomain) {
    return NextResponse.json({ message: "Please enter a valid domain!" }, { status: 400 });
  }
  // Validate domain format
  if (!customDomain.match(/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
    return NextResponse.json({ message: "Invalid domain format" }, { status: 400 });
  }
  

  // Save to MongoDB
  try {
    await Domain.create({ username, customDomain });
    return NextResponse.json({ message: "Domain added. Update your DNS settings." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Domain already exists" }, { status: 400 });
  }
}
