import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-server";
import { isAdminRequest } from "@/lib/admin-auth";
import { curatedBlogPosts } from "@/data/blog-posts";
import { mergeBlogPosts, type BlogPost } from "@/lib/blog";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const isAdmin = isAdminRequest(req);

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
    if (isAdmin) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ posts: mergeBlogPosts(curatedBlogPosts, []) });
  }

  const databasePosts = (data ?? []) as BlogPost[];
  return NextResponse.json({
    posts: mergeBlogPosts(curatedBlogPosts, databasePosts),
  });
}
