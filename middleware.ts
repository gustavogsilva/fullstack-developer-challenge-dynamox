import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;
  const { method } = req;

  if (pathname === "/api/user") return NextResponse.next();
  if (pathname.startsWith("/api/auth")) return NextResponse.next();

  if (pathname.startsWith("/api") && !token) {
    return NextResponse.json({ message: "Unauthorized access" }, { status: 401 });
  }

  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/dashboard"],
};

// * zero or more
// + one or more
// ? zero or one
