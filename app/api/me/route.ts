import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  // Read cookie server-side (works even for HttpOnly cookies)
  const cookieStore = cookies();
  const adminCookie = (await cookieStore).get("admin-auth");

  const isAdmin = !!adminCookie;

  return NextResponse.json({ isAdmin });
}
