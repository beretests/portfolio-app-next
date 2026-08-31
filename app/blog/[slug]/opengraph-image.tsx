import { ImageResponse } from "next/og";
import { getPublicPostBySlug } from "@/lib/blog-server";

export const alt = "Engineering field note by Eberechi Omeje";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublicPostBySlug(slug);
  const title = post?.title ?? "Engineering field notes";
  const tag = post?.tag ?? "Power Platform · Azure · Full-Stack";

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "flex-start",
          background:
            "linear-gradient(135deg, #082f49 0%, #1e3a8a 55%, #0891b2 100%)",
          color: "white",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "#a5f3fc",
            display: "flex",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {tag}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 62,
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: 1050,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", fontSize: 30, fontWeight: 600 }}>
          Eberechi Omeje · Engineering field notes
        </div>
      </div>
    ),
    size,
  );
}
