import axios from "axios";
import Domain from "@/models/domainModel";
import connectToDb from "@/db/db";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    const { domain } = await req.json();

    if (!domain) {
      return NextResponse.json({ error: "Domain is required" }, { status: 400 });
    }

    await connectToDb();

    const domainEntry = await Domain.findOne({ customDomain: domain });
    if (!domainEntry) {
      return NextResponse.json({ error: "Domain not found" }, { status: 404 });
    }

    // Delete from Vercel
    await axios.delete(
      `https://api.vercel.com/v9/projects/${process.env.VERCEL_PROJECT_ID}/domains/${domain}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.VERCEL_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Remove from MongoDB
    await Domain.deleteOne({ customDomain: domain });

    return NextResponse.json({ success: true, message: "Domain deleted successfully!" });
  } catch (error) {
    console.error("Error deleting domain:", error.response?.data || error.message);
    return NextResponse.json(
      { success: false, error: error.response?.data?.error?.message || "Failed to delete domain" },
      { status: 500 }
    );
  }
}
