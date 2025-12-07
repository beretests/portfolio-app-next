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
    .from("resume_content")
    .select("headline,summary,work,education,skills,certifications,languages_frameworks")
    .eq("id", "primary")
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Error loading resume content:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ content: data ?? null });
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const { headline, summary, work, education, skills, certifications, languages_frameworks } = body;

  const { error } = await supabaseAdmin.from("resume_content").upsert({
    id: "primary",
    headline,
    summary,
    work,
    education,
    skills,
    certifications,
    languages_frameworks,
  });

  if (error) {
    console.error("Error saving resume content:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
