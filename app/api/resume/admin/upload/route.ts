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

  const bucket = process.env.SUPABASE_STORAGE_BUCKET || "blog-images";
  const form = await req.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "File is required" }, { status: 400 });
  }

  const safeName = file.name.replace(/[^\w.\-]/g, "_");
  const path = `resume/${Date.now()}-${safeName}`;

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
