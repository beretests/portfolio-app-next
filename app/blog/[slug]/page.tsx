import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Markdown from "markdown-to-jsx";
import { supabase } from "@/lib/supabase";
import { cookies } from "next/headers";
import Image from "next/image";

export const dynamicParams = true;

export async function generateStaticParams() {
  const { data } = await supabase
    .from("posts")
    .select("slug")
    .neq("tag", "Testing");
  return (data || []).map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const adminUser = process.env.BLOG_ADMIN_USER;
  const adminPass = process.env.BLOG_ADMIN_PASS;
  const expectedToken =
    adminUser && adminPass
      ? Buffer.from(`${adminUser}:${adminPass}`).toString("base64")
      : null;
  const cookieToken = (await cookies()).get("admin-auth")?.value;
  const isAdmin = expectedToken && cookieToken === expectedToken;

  let query = supabase
    .from("posts")
    .select("slug,title,description,tag,image,date,body")
    .eq("slug", slug);

  if (!isAdmin) {
    query = query.neq("tag", "Testing");
  }

  const { data: post, error } = await query.single();

  if (error) {
    console.error("Error fetching post:", error);
    notFound();
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-10 space-y-6">
      <Link
        href="/blog"
        className="inline-flex items-center text-sm font-semibold text-link hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        ← Back to blog
      </Link>

      <header className="space-y-2">
        <div className="inline-flex rounded-full bg-primary/15 text-primary px-3 py-1 text-xs font-semibold">
          {post.tag}
        </div>
        <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-headings)] font-bold text-foreground">
          {post.title}
        </h1>
        <p className="text-sm text-foreground/70 font-[family-name:var(--font-body)]">
          {post.date}
        </p>
      </header>

      <div className="rounded-2xl overflow-hidden border border-borderSecondary bg-background shadow-sm">
        <div className="relative w-full aspect-[16/9] border-b border-borderSecondary bg-secondary/30">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 960px, 100vw"
            className="object-cover"
            priority={false}
          />
        </div>
        <div className="p-6 space-y-4">
          <p className="text-lg text-foreground/80 font-[family-name:var(--font-body)]">
            {post.description}
          </p>
          <Markdown
            options={{
              forceBlock: true,
              overrides: {
                p: {
                  props: {
                    className:
                      "text-foreground font-[family-name:var(--font-body)] leading-relaxed mb-3",
                  },
                },
                h2: {
                  props: {
                    className:
                      "text-2xl font-semibold font-[family-name:var(--font-headings)] mt-6 mb-3 text-foreground",
                  },
                },
                h3: {
                  props: {
                    className:
                      "text-xl font-semibold font-[family-name:var(--font-headings)] mt-4 mb-2 text-foreground",
                  },
                },
                ul: {
                  props: {
                    className:
                      "list-disc list-outside pl-5 space-y-2 text-foreground font-[family-name:var(--font-body)]",
                  },
                },
                ol: {
                  props: {
                    className:
                      "list-decimal list-outside pl-5 space-y-2 text-foreground font-[family-name:var(--font-body)]",
                  },
                },
                code: {
                  props: {
                    className:
                      "rounded bg-secondary px-1 py-0.5 font-mono text-sm text-foreground",
                  },
                },
                pre: {
                  props: {
                    className:
                      "overflow-x-auto rounded bg-secondary p-4 font-mono text-sm text-foreground",
                  },
                },
                a: {
                  props: {
                    className:
                      "text-link font-semibold underline underline-offset-4 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  },
                },
                blockquote: {
                  props: {
                    className:
                      "border-l-4 border-primary/50 pl-4 italic text-foreground/80 bg-secondary/30 py-2 rounded-r",
                  },
                },
                hr: {
                  props: {
                    className: "my-6 border-t border-divider",
                  },
                },
              },
            }}
          >
            {post.body}
          </Markdown>
        </div>
      </div>
    </div>
  );
}
