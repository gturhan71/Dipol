import { NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { adminAuth } from "@/lib/firebase/admin";
import { cookies } from "next/headers";

const contentPath = path.join(process.cwd(), "src/data/site-content.json");

// Simple authentication helper
async function isAuthorized() {
  const session = (await cookies()).get("session")?.value;
  if (!session) return false;
  try {
    await adminAuth.verifySessionCookie(session, true);
    return true;
  } catch (error) {
    console.error("Session verification failed:", error);
    return false;
  }
}

export async function GET() {
  try {
    const data = await readFile(contentPath, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: "Content not found" }, { status: 404 });
  }
}

export async function POST(request: Request) {
  // SECURITY: Check authorization
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const newData = await request.json();
    
    // SECURITY: Basic sanitization could be added here
    // For now, we ensure we're writing valid JSON
    await writeFile(contentPath, JSON.stringify(newData, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Content Update Error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
