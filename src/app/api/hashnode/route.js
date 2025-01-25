import { NextResponse } from "next/server";
import axios from "axios";
import { apiResponse } from "@/helpers/apiResponse";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 });
  }

  const host = `${username}.hashnode.dev`; // Construct the host dynamically

  try {
    const response = await axios.post(
      "https://gql.hashnode.com/",
      {
        query: `
          query Publication {
            publication(host: "${host}") {
              posts(first: 20) {
                edges {
                  node {
                    coverImage {
                      url
                    }
                    title
                    brief
                    url
                    author {
                     name
                     username
                    }
                  }
                }
              }
            }
          }
        `,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const posts =
      response.data.data.publication?.posts?.edges.map((edge) => edge.node) ||
      [];
    return apiResponse({data:posts,success:true,message:"Hashnode account linked successfully!",statusCode:200});
  } catch (error) {
    console.error(
      "Error fetching posts:",
      error?.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
