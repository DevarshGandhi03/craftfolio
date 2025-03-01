import { NextResponse } from "next/server";

export const config = {
  matcher: ["/dashboard/:path*", "/signin", "/signup", "/"],
};
const domainMappings = {
  "www.craftfolio.in": "devarsh600", // Example: customDomain → username
};
export default async function middleware(request) {
  const token = request.cookies.get("token");
  const url = request.nextUrl;
  const host = request.headers.get("host");

  if (host && domainMappings[host]) {
    return NextResponse.rewrite(
      new URL(`/portfolio/${domainMappings[host]}`, req.url)
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
