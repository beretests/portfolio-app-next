import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-server";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const adminUser = process.env.BLOG_ADMIN_USER;
  const adminPass = process.env.BLOG_ADMIN_PASS;
  const expectedToken =
    adminUser && adminPass
      ? Buffer.from(`${adminUser}:${adminPass}`).toString("base64")
      : null;
  const cookieToken = req.cookies.get("admin-auth")?.value;
  const isAdmin = expectedToken && cookieToken === expectedToken;

  const client = isAdmin ? supabaseAdmin : supabase;
  const query = client
    .from("posts")
    .select("slug,title,description,tag,image,date,body")
    .order("date", { ascending: false });

  if (!isAdmin) {
    query.neq("tag", "Testing");
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ posts: data ?? [] });
}
