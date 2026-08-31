import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";
import { isAdminRequest } from "@/lib/admin-auth";
import { curatedBlogPosts } from "@/data/blog-posts";
import { getPublicPosts } from "@/lib/blog-server";
import { mergeBlogPosts, type BlogPost } from "@/lib/blog";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const isAdmin = isAdminRequest(req);

  if (!isAdmin) {
    return NextResponse.json({ posts: await getPublicPosts() });
  }

  const { data, error } = await supabaseAdmin
    .from("posts")
    .select("slug,title,description,tag,image,date,body")
    .order("date", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    posts: mergeBlogPosts(curatedBlogPosts, (data ?? []) as BlogPost[]),
  });
}
