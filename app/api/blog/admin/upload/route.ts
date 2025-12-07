import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const bucket = process.env.SUPABASE_STORAGE_BUCKET || "blog-images";
  if (!bucket) {
    return NextResponse.json(
      { error: "SUPABASE_STORAGE_BUCKET is not configured" },
      { status: 500 }
    );
  }

  const form = await req.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "File is required" }, { status: 400 });
  }

  const safeName = file.name.replace(/[^\w.\-]/g, "_");
  const path = `uploads/${Date.now()}-${safeName}`;

  const { error } = await supabaseAdmin.storage
    .from(bucket)
    .upload(path, file, {
      contentType: file.type || "application/octet-stream",
      upsert: true,
    });

  if (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: publicUrlData } = supabaseAdmin.storage
    .from(bucket)
    .getPublicUrl(path);

  return NextResponse.json({
    success: true,
    path,
    publicUrl: publicUrlData.publicUrl,
  });
}
