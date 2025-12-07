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

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const {
    id,
    name,
    status,
    gifUrl,
    liveUrl,
    githubUrl,
    overview,
    goals = [],
    designDecisions = [],
    techStack = [],
    challenges = [],
    learnings = [],
  } = body;

  if (!id || !name || !overview) {
    return NextResponse.json(
      { error: "id, name, and overview are required" },
      { status: 400 }
    );
  }

  const { error } = await supabaseAdmin.from("projects").upsert(
    {
      id,
      name,
      status,
      gifUrl,
      liveUrl,
      githubUrl,
      overview,
      goals,
      designDecisions,
      techStack,
      challenges,
      learnings,
    },
    { onConflict: "id" }
  );

  if (error) {
    console.error("Error saving project:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
