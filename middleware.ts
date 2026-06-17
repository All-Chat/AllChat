import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  // If NOT www → redirect to www
  if (!hostname.startsWith("www.")) {
    return NextResponse.redirect(
      new URL(`https://www.${hostname}${url.pathname}${url.search}`)
    );
  }

  return NextResponse.next();
}

// Apply to all routes
export const config = {
  matcher: "/:path*",
};
