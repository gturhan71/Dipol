import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { adminAuth } from "@/lib/firebase/admin";
import { cookies } from "next/headers";

// SECURITY: Configuration
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];

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

export async function POST(request: Request) {
  // SECURITY: Authorization check
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file received." }, { status: 400 });
    }

    // SECURITY: File Size Validation
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File too large (Max 5MB)" }, { status: 400 });
    }

    // SECURITY: MIME Type Validation
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Only JPG, PNG, WEBP and SVG allowed." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // SECURITY: Robust filename sanitization
    const extension = path.extname(file.name).toLowerCase();
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `upload-${uniqueSuffix}${extension}`;
    
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const filepath = path.join(uploadDir, filename);
    
    await writeFile(filepath, buffer);

    return NextResponse.json({ 
      success: true, 
      url: `/uploads/${filename}` 
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload file." }, { status: 500 });
  }
}
