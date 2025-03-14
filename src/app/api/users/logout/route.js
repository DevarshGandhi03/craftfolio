import { NextResponse } from "next/server";

export function DELETE() {
  const response = NextResponse.json({ message: "Logged out successfully" });

  // Clear the authentication cookie (modify the cookie name as per your setup)
  response.headers.set(
    "Set-Cookie",
    `token=; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
  );

  return response;
}
