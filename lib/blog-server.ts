import { curatedBlogPosts, getCuratedPostBySlug } from "@/data/blog-posts";
import { mergeBlogPosts, type BlogPost } from "@/lib/blog";
import { supabase } from "@/lib/supabase";

const publicPostColumns = "slug,title,description,tag,image,date,body";

async function getPublicDatabasePosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("posts")
    .select(publicPostColumns)
    .neq("tag", "Testing")
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching public field notes:", error);
    return [];
  }

  return (data ?? []) as BlogPost[];
}

export async function getPublicPosts(): Promise<BlogPost[]> {
  const databasePosts = await getPublicDatabasePosts();
  return mergeBlogPosts(curatedBlogPosts, databasePosts);
}

export async function getPublicPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  const curatedPost = getCuratedPostBySlug(slug);
  if (curatedPost) return { ...curatedPost, source: "code" };

  const { data, error } = await supabase
    .from("posts")
    .select(publicPostColumns)
    .eq("slug", slug)
    .neq("tag", "Testing")
    .maybeSingle();

  if (error) {
    console.error("Error fetching public field note:", error);
    return null;
  }

  return data ? ({ ...data, source: "database" } as BlogPost) : null;
}
