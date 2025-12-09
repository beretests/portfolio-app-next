import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  // 1. Block requests not from Vercel Cron
  const isCron = req.headers.get("x-vercel-cron") === "1";
  if (!isCron) {
    return NextResponse.json(
      { error: "Unauthorized – this endpoint is for Vercel Cron only." },
      { status: 401 }
    );
  }

  // 2. Optional: require a secret header too
  const expectedSecret = process.env.CRON_SECRET;
  const providedSecret = req.headers.get("x-cron-secret");

  if (!expectedSecret || providedSecret !== expectedSecret) {
    return NextResponse.json(
      { error: "Unauthorized – invalid secret." },
      { status: 401 }
    );
  }

  // 3. Run your “keep warm” logic
  try {
    const { error } = await supabaseAdmin
      .from("resume_content")
      .select("id")
      .limit(1);

    if (error) {
      console.error("[CRON ERROR]", error.message);
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    console.log("[CRON OK] Supabase warmed.");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[CRON EXCEPTION]", err);
    return NextResponse.json(
      { ok: false, error: "Unexpected error." },
      { status: 500 }
    );
  }
}
