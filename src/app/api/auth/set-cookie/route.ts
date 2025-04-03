import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token } = await req.json();

  console.log(token);
  if (!token) {
    return NextResponse.json({ error: "Token is required" }, { status: 400 });
  }

  // Set cookie with HttpOnly flag 
  const response = NextResponse.json({ message: "Token stored" });
  response.cookies.set({
    name: "accessToken",
    value: token,
    httpOnly: true, // Prevents access from JavaScript
    secure: process.env.NODE_ENV === "production", // Only secure in production
    sameSite: "strict",
    path: "/",
  });

  return response;
}