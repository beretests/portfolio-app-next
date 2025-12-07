import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_PATHS = [
  "/blog/editor",
  "/api/blog/admin/create",
  "/api/blog/admin/update",
  "/api/blog/admin/delete",
  "/api/about/admin/upload",
  "/admin",
  "/api/resume/admin/upload",
  "/api/resume/admin/save",
  "/api/resume/admin/content",
];

function unauthorized() {
  return new NextResponse("Unauthorized", { status: 401 });
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the login page and login API without auth
  if (
    pathname.startsWith("/blog/admin/sign-in") ||
    pathname.startsWith("/api/blog/admin/login") ||
    pathname.startsWith("/api/blog/admin/logout")
  ) {
    return NextResponse.next();
  }

  if (!ADMIN_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const user = process.env.BLOG_ADMIN_USER;
  const pass = process.env.BLOG_ADMIN_PASS;
  if (!user || !pass) {
    console.error("BLOG_ADMIN_USER or BLOG_ADMIN_PASS not set");
    return unauthorized();
  }

  // Check signed cookie first (set via login API)
  const cookieToken = request.cookies.get("admin-auth")?.value;
  const expectedToken = Buffer.from(`${user}:${pass}`).toString("base64");
  if (cookieToken === expectedToken) {
    return NextResponse.next();
  }

  // Fallback to basic auth header for compatibility
  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Basic ")) {
    const base64 = authHeader.split(" ")[1];
    try {
      const decoded = Buffer.from(base64, "base64").toString("utf8");
      const [inputUser, inputPass] = decoded.split(":");
      if (inputUser === user && inputPass === pass) {
        const res = NextResponse.next();
        res.cookies.set("admin-auth", expectedToken, {
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          path: "/",
        });
        return res;
      }
    } catch (err) {
      console.error("Failed to decode auth header", err);
    }
  }

  // Redirect unauthenticated users to the admin sign-in page
  const signInUrl = new URL("/blog/admin/sign-in", request.url);
  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: [
    "/blog/editor/:path*",
    "/api/blog/admin/:path*",
    "/api/about/admin/:path*",
    "/api/resume/admin/:path*",
    "/admin",
    "/blog/admin/sign-in",
  ],
};
