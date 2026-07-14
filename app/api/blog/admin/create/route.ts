import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";
import { isAdminRequest } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { slug, title, description, tag, image, date, body: content } = body;

  if (!slug || !title || !description || !tag || !image || !date || !content) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return NextResponse.json(
      { error: "Slug must contain lowercase letters, numbers and hyphens only" },
      { status: 400 }
    );
  }

  const { error } = await supabaseAdmin.from("posts").upsert(
    {
      slug,
      title,
      description,
      tag,
      image,
      date,
      body: content,
    },
    { onConflict: "slug" }
  );

  if (error) {
    console.error("Error inserting post:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
