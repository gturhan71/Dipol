import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // In a real app, you would check a database here
    const validUsername = "admin";
    const validPassword = process.env.ADMIN_PASSWORD;

    if (username === validUsername && password === validPassword) {
      // Return the secure token from env
      return NextResponse.json({ 
        success: true, 
        token: process.env.ADMIN_AUTH_TOKEN 
      });
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
