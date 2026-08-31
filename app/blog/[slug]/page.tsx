import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Markdown from "markdown-to-jsx";
import { curatedBlogPosts, getCuratedPostBySlug } from "@/data/blog-posts";
import { isValidAdminToken } from "@/lib/admin-auth";
import {
  formatBlogDate,
  getReadingTime,
  type BlogPost,
} from "@/lib/blog";
import { supabase } from "@/lib/supabase";
import BlogViewCount from "@/app/components/BlogViewCount";
import JsonLd from "@/app/components/JsonLd";
import { getPublicPostBySlug, getPublicPosts } from "@/lib/blog-server";
import { absoluteUrl, siteName } from "@/lib/site";

export const dynamicParams = true;

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getPublicPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

async function getPost(slug: string, isAdmin = false) {
  if (!isAdmin) return getPublicPostBySlug(slug);

  const curatedPost = getCuratedPostBySlug(slug);
  if (curatedPost) return { ...curatedPost, source: "code" } as BlogPost;

  const { data, error } = await supabase
    .from("posts")
    .select("slug,title,description,tag,image,date,body")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }

  return data ? ({ ...data, source: "database" } as BlogPost) : null;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublicPostBySlug(slug);

  if (!post) {
    return {
      title: "Article not found",
      robots: { index: false, follow: false },
    };
  }

  const canonicalPath = "/blog/" + post.slug;
  const socialImage = post.image
    ? absoluteUrl(post.image)
    : absoluteUrl(canonicalPath + "/opengraph-image");

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: siteName, url: "/about" }],
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: canonicalPath,
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [siteName],
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [socialImage],
    },
  };
}

type RelatedProject = {
  href: string;
  title: string;
  label: string;
  external?: boolean;
};

const relatedProjectsBySlug: Record<string, RelatedProject> = {
  "resilient-event-driven-key-vault-credential-rotation": {
    href: "/projects/event-driven-key-vault-credential-rotation",
    title: "See the architecture in the project portfolio",
    label: "View case study",
  },
  "connecting-existing-accounts-without-exposing-account-state": {
    href: "/projects/family-chore-hub",
    title: "See the family application case study",
    label: "View family app case study",
  },
  "allocating-lump-sum-loan-payments-without-losing-a-cent": {
    href: "https://github.com/beretests/loan-payback-tracker",
    title: "Explore the loan payment tracker implementation",
    label: "View GitHub repository",
    external: true,
  },
};

function FieldNoteArtwork({ post }: { post: BlogPost }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-sky-950 via-blue-900 to-cyan-600 px-5 py-10 sm:px-10 sm:py-14">
      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/20 bg-white/5" />
      <p className="relative font-[family-name:var(--font-cta)] text-xs font-bold uppercase tracking-[0.2em] text-cyan-100">
        {post.tag}
      </p>
      <p className="relative mt-6 max-w-4xl font-[family-name:var(--font-headings)] text-3xl font-bold leading-tight text-white sm:text-4xl">
        {post.title}
      </p>
      <p className="relative mt-5 text-sm font-semibold text-cyan-50/85">
        Engineering field note by {siteName}
      </p>
    </div>
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const cookieToken = (await cookies()).get("admin-auth")?.value;
  const post = await getPost(slug, isValidAdminToken(cookieToken));

  if (!post) notFound();

  const publicPosts = await getPublicPosts();
  const relatedPosts = publicPosts
    .filter((candidate) => candidate.slug !== post.slug)
    .filter((candidate) => candidate.tag === post.tag)
    .slice(0, 3);
  const relatedProject = relatedProjectsBySlug[post.slug];
  const canonicalUrl = absoluteUrl("/blog/" + post.slug);
  const socialImage = post.image
    ? absoluteUrl(post.image)
    : absoluteUrl("/blog/" + post.slug + "/opengraph-image");
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: socialImage,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: canonicalUrl,
    author: {
      "@type": "Person",
      name: siteName,
      url: absoluteUrl("/about"),
    },
    publisher: {
      "@type": "Person",
      name: siteName,
      url: absoluteUrl("/"),
    },
    isPartOf: {
      "@type": "Blog",
      name: "Engineering Field Notes",
      url: absoluteUrl("/blog"),
    },
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 lg:px-8">
      <JsonLd data={articleJsonLd} />
      <Link href="/blog" className="inline-flex items-center rounded-md border border-borderSecondary bg-background px-3 py-2 text-sm font-bold text-foreground transition hover:bg-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        ← Back to field notes
      </Link>

      <article className="mt-6 overflow-hidden rounded-3xl border border-borderSecondary bg-background shadow-sm">
        <header className="bg-gradient-to-br from-primary/10 via-background to-secondary/60 p-6 sm:p-10">
          <span className="inline-flex rounded-full bg-primary/15 px-3 py-1 text-xs font-bold text-primary">
            {post.tag}
          </span>
          <h1 className="mt-4 max-w-4xl text-balance font-[family-name:var(--font-headings)] text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-foreground/75">
            {post.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-semibold text-foreground/65">
            <span className="text-foreground">Eberechi Omeje</span>
            <span aria-hidden>·</span>
            <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{getReadingTime(post.body)} min read</span>
            <BlogViewCount slug={post.slug} />
          </div>
        </header>

        <div className="border-y border-borderSecondary">
          {post.image ? (
            <div className="relative aspect-[16/9] bg-secondary/30">
              <Image src={post.image} alt="" fill sizes="(min-width: 1024px) 960px, 100vw" className="object-cover" priority />
            </div>
          ) : (
            <FieldNoteArtwork post={post} />
          )}
        </div>

        <div className="mx-auto max-w-3xl px-6 py-9 sm:px-10 sm:py-12">
          <Markdown
            options={{
              forceBlock: true,
              overrides: {
                p: { props: { className: "mb-5 text-[1.05rem] leading-8 text-foreground/85" } },
                h2: { props: { className: "mb-4 mt-10 scroll-mt-24 font-[family-name:var(--font-headings)] text-3xl font-bold text-foreground first:mt-0" } },
                h3: { props: { className: "mb-3 mt-8 scroll-mt-24 font-[family-name:var(--font-headings)] text-2xl font-bold text-foreground" } },
                ul: { props: { className: "mb-6 list-disc space-y-2 pl-6 text-[1.05rem] leading-8 text-foreground/85 marker:text-primary" } },
                ol: { props: { className: "mb-6 list-decimal space-y-2 pl-6 text-[1.05rem] leading-8 text-foreground/85 marker:font-bold marker:text-primary" } },
                li: { props: { className: "pl-1" } },
                strong: { props: { className: "font-bold text-foreground" } },
                code: { props: { className: "rounded bg-secondary px-1.5 py-0.5 font-mono text-sm text-foreground" } },
                pre: { props: { className: "mb-6 overflow-x-auto rounded-xl border border-borderSecondary bg-secondary p-4 font-mono text-sm text-foreground" } },
                a: { props: { className: "font-bold text-link underline decoration-link/35 underline-offset-4 transition hover:text-primary" } },
                blockquote: { props: { className: "my-7 rounded-r-xl border-l-4 border-primary bg-secondary/35 px-5 py-4 italic text-foreground/80" } },
                hr: { props: { className: "my-9 border-divider" } },
              },
            }}
          >
            {post.body}
          </Markdown>
        </div>
      </article>

      {relatedProject && (
        <aside className="mt-8 rounded-2xl border border-borderSecondary bg-secondary/30 p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div>
            <p className="font-[family-name:var(--font-cta)] text-xs font-bold uppercase tracking-[0.16em] text-primary">
              Continue exploring
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-headings)] text-2xl font-bold text-foreground">
              {relatedProject.title}
            </h2>
          </div>
          {relatedProject.external ? (
            <a
              href={relatedProject.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex shrink-0 rounded-md bg-primary px-4 py-2.5 text-sm font-bold text-background transition hover:opacity-90 sm:mt-0"
            >
              {relatedProject.label} →
            </a>
          ) : (
            <Link
              href={relatedProject.href}
              className="mt-4 inline-flex shrink-0 rounded-md bg-primary px-4 py-2.5 text-sm font-bold text-background transition hover:opacity-90 sm:mt-0"
            >
              {relatedProject.label} →
            </Link>
          )}
        </aside>
      )}

      {relatedPosts.length > 0 && (
        <section aria-labelledby="related-posts" className="mt-10">
          <h2 id="related-posts" className="font-[family-name:var(--font-headings)] text-2xl font-bold text-foreground">
            Related field notes
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`} className="rounded-xl border border-borderSecondary bg-background p-5 transition hover:-translate-y-0.5 hover:shadow-md">
                <span className="text-xs font-bold text-primary">{relatedPost.tag}</span>
                <h3 className="mt-2 font-[family-name:var(--font-headings)] text-lg font-bold text-foreground">
                  {relatedPost.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
