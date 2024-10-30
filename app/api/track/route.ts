// app/api/track/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const { error } = await supabase.from("visitors").insert({
    page_url: data.pageUrl,
    referrer: data.referrer,
    // user_agent: data.userAgent,
    // ip_address: data.ipAddress,
    // Add more fields as needed
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
