import { NextResponse } from "next/server";
import dns from "dns/promises";
import connectToDb from "@/db/db";
import Domain from "@/models/domainModel";

export async function GET(req) {
  await connectToDb();
  const { searchParams } = new URL(req.url);
  const domain = searchParams.get("domain");

  try {
    const records = await dns.resolveCname(domain);
    console.log(records);
    
    if (!records.includes("craftfolio-rouge.vercel.app")) {
      return NextResponse.json({ error: "Domain verification failed" }, { status: 400 });
    }

    // Update status in MongoDB
    await Domain.findOneAndUpdate({ customDomain: domain }, { status: "verified" });

    return NextResponse.json({ message: "Domain verified successfully!" ,success:true});
  } catch (error) {
    return NextResponse.json({ error: "Domain verification failed" }, { status: 400 });
  }
}
