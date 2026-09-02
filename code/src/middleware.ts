import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  const { pathname } = request.nextUrl;

  // Portal protection
  if (pathname.startsWith("/portal") && pathname !== "/portal/login") {
    if (!session) {
      return NextResponse.redirect(new URL("/portal/login", request.url));
    }
  }

  // API protection (POST/PUT/DELETE for content and upload)
  if (
    (pathname.startsWith("/api/content") || pathname.startsWith("/api/upload")) &&
    request.method !== "GET"
  ) {
    if (!session) {
      return new NextResponse(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/portal/:path*", "/api/content/:path*", "/api/upload/:path*"],
};
