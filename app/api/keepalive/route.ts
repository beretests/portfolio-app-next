import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";

export const runtime = "nodejs";

// Lightweight endpoint you can ping (cron/uptimer) to keep Supabase warm.
export async function GET() {
  try {
    // Small, cached-friendly query; adjust table if needed.
    const { error } = await supabaseAdmin.from("resume_content").select("id").limit(1);
    if (error) {
      console.error("Keepalive error:", error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Keepalive exception:", err);
    return NextResponse.json({ ok: false, error: "Unexpected error" }, { status: 500 });
  }
}
