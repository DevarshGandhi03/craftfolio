import axios from "axios";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/dashboard/:path*", "/signin", "/signup", "/"],
};

export default async function middleware(request) {
  const token = request.cookies.get("token");
  const url = request.nextUrl;
  const host = request.headers.get("host");
  console.log(host);
  

  try {
    
    const response = await axios.get(`${request.nextUrl.origin}/api/domain/get`, {
      headers: { host },
    });
    console.log(response);
    
    if (response.data.success) {
      const { username } = response.data;
      return NextResponse.rewrite(new URL(`/portfolio/${username}`, req.url));
    }
  } catch (error) {
    console.error(
      "Domain lookup failed:",
      error.response?.data || error.message
    );
  }
  if (
    token &&
    (url.pathname.startsWith("/signin") || url.pathname.startsWith("/signup"))
  ) {
    return NextResponse.redirect(new URL("/dashboard/profile", request.url));
  }

  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}
