// app/api/about/images/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";

export const runtime = "nodejs";

const ALLOWED_CAROUSELS = ["choral", "plants", "roadTrips"] as const;
type CarouselKey = (typeof ALLOWED_CAROUSELS)[number];

export async function GET() {
  const bucket = process.env.SUPABASE_STORAGE_BUCKET || "blog-images";

  const result: Record<CarouselKey, { name: string; url: string }[]> = {
    choral: [],
    plants: [],
    roadTrips: [],
  };

  try {
    for (const carousel of ALLOWED_CAROUSELS) {
      // list e.g. "about/choral"
      const { data, error } = await supabaseAdmin.storage
        .from(bucket)
        .list(`about/${carousel}`, {
          limit: 100,
          offset: 0,
        });

      if (error) {
        console.error(`List error for ${carousel}:`, error);
        continue;
      }

      const images =
        data
          ?.filter(
            (file) =>
              file.metadata?.mimetype?.startsWith("image") ||
              file.name.match(/\.(png|jpe?g|gif|webp|avif)$/i)
          )
          .map((file) => {
            const { data: publicUrlData } = supabaseAdmin.storage
              .from(bucket)
              .getPublicUrl(`about/${carousel}/${file.name}`);
            return {
              name: file.name,
              url: publicUrlData.publicUrl,
            };
          }) ?? [];

      result[carousel] = images;
    }

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("List error:", err);
    return NextResponse.json(
      { error: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
