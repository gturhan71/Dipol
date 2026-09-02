import { NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { adminAuth } from "@/lib/firebase/admin";
import { cookies } from "next/headers";

const contentPath = path.join(process.cwd(), "src/data/site-content.json");

// Simple in-memory rate limiter (resets when the server restarts)
const rateLimitMap = new Map<string, { count: number, lastRequest: number }>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 100; // max 100 requests per IP per minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip) || { count: 0, lastRequest: now };

  if (now - record.lastRequest > RATE_LIMIT_WINDOW_MS) {
    record.count = 1;
    record.lastRequest = now;
  } else {
    record.count++;
  }

  rateLimitMap.set(ip, record);
  return record.count <= MAX_REQUESTS_PER_WINDOW;
}

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

function getIp(request: Request): string {
  return request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
}

export async function GET(request: Request) {
  if (!checkRateLimit(getIp(request))) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  
  try {
    const data = await readFile(contentPath, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: "Content not found" }, { status: 404 });
  }
}

export async function POST(request: Request) {
  const ip = getIp(request);
  
  // Stricter rate limit for POST requests (e.g., max 20 per minute)
  const now = Date.now();
  const record = rateLimitMap.get(`${ip}_post`) || { count: 0, lastRequest: now };
  if (now - record.lastRequest > 60000) {
    record.count = 1;
    record.lastRequest = now;
  } else {
    record.count++;
  }
  rateLimitMap.set(`${ip}_post`, record);

  if (record.count > 20) {
    return NextResponse.json({ error: "Too many update requests" }, { status: 429 });
  }

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
