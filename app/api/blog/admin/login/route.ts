import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  const user = process.env.BLOG_ADMIN_USER;
  const pass = process.env.BLOG_ADMIN_PASS;

  if (!user || !pass) {
    console.error("BLOG_ADMIN_USER or BLOG_ADMIN_PASS not set");
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  if (username !== user || password !== pass) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = Buffer.from(`${user}:${pass}`).toString("base64");
  const res = NextResponse.json({ success: true });
  res.cookies.set("admin-auth", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });
  return res;
}
