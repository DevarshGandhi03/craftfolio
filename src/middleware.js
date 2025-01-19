import { NextResponse } from "next/server";

export const config = {
  matcher: ["/dashboard/:path*", "/signin", "/signup", "/"],
};

export default async function middleware(request) {
  const token = request.cookies.get("token");
  const url = request.nextUrl;
  if (
    token &&
    (url.pathname.startsWith("/signin") ||
      url.pathname.startsWith("/signup") ||
      url.pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/dashboard/profile", request.url));
  }

  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

// export default middleware;
