import connectToDb from "@/db/db";
import Domain from "@/models/domainModel";
import { NextResponse } from "next/server";


export async function POST(req) {
  await connectToDb();
  const { username, customDomain } = await req.json();

  // Validate domain format
  if (!customDomain.match(/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
    return NextResponse.json({ error: "Invalid domain format" }, { status: 400 });
  }

  // Save to MongoDB
  try {
    await Domain.create({ username, customDomain });
    return NextResponse.json({ message: "Domain added. Update your DNS settings." });
  } catch (error) {
    return NextResponse.json({ error: "Domain already exists" }, { status: 400 });
  }
}
