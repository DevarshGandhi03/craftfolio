import connectToDb from "@/db/db";
import Portfolio from "@/models/portfolioModel";

export const GET = async () => {
    connectToDb();
    try {
        const portfolios = await Portfolio.find({})
            .sort({ _id: -1 }) // Get the latest documents
            .limit(10) // Limit to last 10 documents
            .select("userName isPublished fullName userDescription"); // Select specific fields

        return Response.json(portfolios, { status: 200 });
    } catch (error) {
        console.error("Error fetching portfolios:", error);
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};
