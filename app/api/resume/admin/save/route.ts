import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";

export const runtime = "nodejs";

function isAdmin(request: NextRequest) {
  const user = process.env.BLOG_ADMIN_USER;
  const pass = process.env.BLOG_ADMIN_PASS;
  if (!user || !pass) return false;
  const expectedToken = Buffer.from(`${user}:${pass}`).toString("base64");

  const cookieToken = request.cookies.get("admin-auth")?.value;
  if (cookieToken === expectedToken) return true;

  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Basic ")) {
    const provided = authHeader.split(" ")[1];
    return provided === expectedToken;
  }
  return false;
}

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { data, error } = await supabaseAdmin
    .from("resume_links")
    .select("url")
    .eq("id", "primary")
    .single();
  if (error && error.code !== "PGRST116") {
    console.error("Error loading resume link:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ url: data?.url || "" });
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const { url } = body;
  if (!url) {
    return NextResponse.json({ error: "url is required" }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("resume_links")
    .upsert({ id: "primary", url });

  if (error) {
    console.error("Error saving resume link:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, url });
}
