// app/api/about/admin/upload/route.ts
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

const ALLOWED_CAROUSELS = ["choral", "plants", "roadTrips"] as const;
type CarouselKey = (typeof ALLOWED_CAROUSELS)[number];

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bucket = process.env.SUPABASE_STORAGE_BUCKET || "blog-images";
  const form = await req.formData();
  const files = [
    ...(form.getAll("file") as File[]),
    ...(form.getAll("files") as File[]),
  ].filter((f) => f instanceof File) as File[];

  if (files.length === 0) {
    return NextResponse.json({ error: "File is required" }, { status: 400 });
  }

  // ✅ read carousel from form-data, default to "choral"
  const carouselRaw = form.get("carousel");
  let carousel: CarouselKey = "choral";

  if (typeof carouselRaw === "string") {
    if ((ALLOWED_CAROUSELS as readonly string[]).includes(carouselRaw)) {
      carousel = carouselRaw as CarouselKey;
    }
  }

  const uploads: { path: string; publicUrl: string }[] = [];

  for (const file of files) {
    const safeName = file.name.replace(/[\^\s]+/g, "_").replace(/[^\w.\-]/g, "_");
    const path = `about/${carousel}/${Date.now()}-${Math.random().toString(16).slice(2)}-${safeName}`;

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

    uploads.push({ path, publicUrl: publicUrlData.publicUrl });
  }

  return NextResponse.json({
    success: true,
    carousel,
    uploads,
  });
}
