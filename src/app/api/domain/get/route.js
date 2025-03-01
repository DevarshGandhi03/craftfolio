import { NextResponse } from "next/server";

import Domain from "@/models/domainModel";
import connectToDb from "@/db/db";

export async function GET(req) {
  try {
    await connectToDb();
    const host = req.headers.get("host");

    const domainEntry = await Domain.findOne({ customDomain: host });

    if (!domainEntry) {
      return NextResponse.json({ success: false, message: "Domain not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, username: domainEntry.username });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
