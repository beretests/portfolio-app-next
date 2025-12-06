import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { slug, title, description, tag, image, date, body: content } = body;

  if (!slug || !title || !description || !tag || !image || !date || !content) {
    return NextResponse.json(
      { error: "Missing required fields" },
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
