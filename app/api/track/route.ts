import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

let cachedCount: number | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const runtime = "edge";

async function getGeolocation(ip: string) {
  const response = await fetch(`https://ipapi.co/${ip}/json/`);
  return response.json();
}
const currentTime = Date.now();

export async function POST(req: NextRequest) {
  const data = await req.json();
  const ip = req.headers.get("x-forwarded-for") || req.ip || "127.0.0.1";
  const geoData = await getGeolocation(ip);

  // Check if there's an existing entry with the same session_id and user_agent
  const { data: recentEntry, error: fetchError } = await supabase
    .from("visitors")
    .select("*")
    .eq("ip_address", ip)
    .eq("user_agent", data.userAgent)
    .order("timestamp", { ascending: false })
    .limit(1);

  if (fetchError) {
    console.error("Error fetching existing entry:", fetchError);
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  let visitorId = crypto.randomUUID();
  let sessionId = crypto.randomUUID();

  if (recentEntry && recentEntry.length > 0) {
    const entry = recentEntry[0];

    // Logic for determining visitor_id and session_id based on constraints
    if (entry.referrer === data.referrer) {
      visitorId = entry.visitor_id;
      sessionId = entry.session_id;
    } else if (entry.ip_address === ip) {
      visitorId = entry.visitor_id; // Keep the same visitor ID
      sessionId = crypto.randomUUID(); // Generate a new session ID
    }
  }

  // Check for duplicate (visitor_id, session_id, page_url)
  const { data: existingRow, error: rowCheckError } = await supabase
    .from("visitors")
    .select("id")
    .eq("visitor_id", visitorId)
    .eq("session_id", sessionId)
    .eq("page_url", data.pageUrl)
    .limit(1);

  if (rowCheckError) {
    console.error("Error checking for duplicate row:", rowCheckError);
    return NextResponse.json({ error: rowCheckError.message }, { status: 500 });
  }

  if (existingRow && existingRow.length > 0) {
    // Row already exists, no action needed
    return NextResponse.json({
      success: true,
      message: "Entry already exists. No action taken.",
      visitorId,
      sessionId,
    });
  }

  // Prepare data for insertion
  const insertData = {
    page_url: data.pageUrl,
    visitor_id: visitorId,
    session_id: sessionId,
    ip_address: ip,
    country: geoData.country,
    user_agent: data.userAgent,
    city: geoData.city,
    referrer: data.referrer,
    timestamp: new Date().toISOString(),
  };

  // Insert new data
  const { error: insertError } = await supabase
    .from("visitors")
    .insert(insertData);

  if (insertError) {
    console.error("Error inserting visitor data:", insertError);
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  // Count unique visitors (this part remains unchanged)
  if (cachedCount === null || currentTime - lastFetchTime > CACHE_DURATION) {
    const { data: visitorData, error } = await supabase
      .from("visitors")
      .select("visitor_id");

    if (error) {
      console.error("Error fetching visitor data:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const uniqueVisitors = new Set(visitorData.map((row) => row.visitor_id));
    cachedCount = uniqueVisitors.size;
    lastFetchTime = currentTime;
  }

  return NextResponse.json({
    success: true,
    visitorId,
    sessionId,
    uniqueVisitorCount: cachedCount,
  });
}

// Add a GET method to fetch the unique visitor count
export async function GET() {
  if (cachedCount === null || currentTime - lastFetchTime > CACHE_DURATION) {
    const { data, error } = await supabase.rpc("get_distinct_visitor_ids");

    if (error) {
      console.error("Error fetching visitor data:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    const count = data[0].count;
    // const uniqueVisitors = new Set(visitorData.map((row) => row.visitor_id));
    cachedCount = count;
    lastFetchTime = currentTime;
  }

  return NextResponse.json({ count: cachedCount });
}
