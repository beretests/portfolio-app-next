import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin.rpc("get_analytics_summary");

  if (error) {
    console.error("Error fetching analytics summary:", error);
    return NextResponse.json(
      {
        error: "Analytics is not configured yet.",
        setupRequired: true,
      },
      { status: 503 }
    );
  }

  return NextResponse.json(data, {
    headers: { "Cache-Control": "private, no-store" },
  });
}
