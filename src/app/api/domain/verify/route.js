import { NextResponse } from "next/server";
import dns from "dns/promises";
import connectToDb from "@/db/db";
import Domain from "@/models/domainModel";

export async function GET(req) {
  await connectToDb();
  const { searchParams } = new URL(req.url);
  const domain = searchParams.get("domain");

  try {
    let isCnameValid = false;
    let isARecordValid = false;

    // Check CNAME Record for 'www.domain.com'
    try {
      const cnameRecords = await dns.resolveCname(`www.${domain}`);
      isCnameValid = cnameRecords.includes("craftfolio-rouge.vercel.app");
    } catch (err) {
      console.log("CNAME check failed or not found", err);
    }

    // Check A Record for 'domain.com'
    try {
      const aRecords = await dns.resolve4(domain);
      isARecordValid = aRecords.includes("76.76.21.21");
    } catch (err) {
      console.log("A record check failed or not found", err);
    }

    // If either check passes, verify the domain
    if (isARecordValid || isCnameValid) {
      await Domain.findOneAndUpdate(
        { customDomain: domain },
        { status: "verified" }
      );

      return NextResponse.json({
        message: "Domain verified successfully!",
        success: true,
      });
    }

    return NextResponse.json(
      { error: "Domain verification failed. Check your DNS settings." },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error verifying domain:", error);
    return NextResponse.json(
      { error: "Domain verification failed due to server error." },
      { status: 500 }
    );
  }
}
