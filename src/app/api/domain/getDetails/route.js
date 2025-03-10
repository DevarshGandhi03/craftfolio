import { NextResponse } from "next/server";

import Domain from "@/models/domainModel";
import connectToDb from "@/db/db";

export async function GET(req) {
  try {
    await connectToDb();
    const username = req.headers.get("userName");

    const domainEntry = await Domain.findOne({ username: username });

    if (!domainEntry) {
      return NextResponse.json({ success: false, message: "Domain not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, customDomain: domainEntry.customDomain,isVerified: domainEntry.status});
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
