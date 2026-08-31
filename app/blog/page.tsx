import type { Metadata } from "next";
import BlogExplorer from "@/app/blog/BlogExplorer";
import { getPublicPosts } from "@/lib/blog-server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Engineering Field Notes",
  description:
    "Practical field notes on Power Platform engineering, Microsoft Azure architecture, identity, security and full-stack product delivery.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Engineering Field Notes",
    description:
      "Architecture decisions, delivery patterns and lessons from Power Platform, Azure and full-stack engineering work.",
    type: "website",
    url: "/blog",
  },
};

export default async function BlogPage() {
  const posts = await getPublicPosts();

  return <BlogExplorer initialPosts={posts} />;
}
