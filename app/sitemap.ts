import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { getPublicPosts } from "@/lib/blog-server";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublicPosts();

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), priority: 1, changeFrequency: "monthly" },
    { url: absoluteUrl("/about"), priority: 0.8, changeFrequency: "yearly" },
    { url: absoluteUrl("/resume"), priority: 0.9, changeFrequency: "monthly" },
    { url: absoluteUrl("/projects"), priority: 0.9, changeFrequency: "monthly" },
    { url: absoluteUrl("/blog"), priority: 0.9, changeFrequency: "weekly" },
  ];

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: absoluteUrl("/projects/" + project.id),
    priority: project.featured ? 0.8 : 0.7,
    changeFrequency: "monthly",
  }));

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl("/blog/" + post.slug),
    lastModified: new Date(post.date + "T12:00:00Z"),
    priority: 0.8,
    changeFrequency: "monthly",
  }));

  return [...staticPages, ...projectPages, ...postPages];
}
