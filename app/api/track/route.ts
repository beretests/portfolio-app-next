import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";

// Use the Node runtime so we can safely access the service-role key (bypasses RLS).
export const runtime = "nodejs";

// Simple in-memory cache to avoid hammering the DB for counts
let cachedCount: number | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const encoder = new TextEncoder();

const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function getClientIp(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return req.ip || "unknown";
}

async function hashFingerprint(value: string) {
  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    encoder.encode(value)
  );
  const hex = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  // Format first 32 chars of the hash as a UUID so it fits uuid columns
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(
    12,
    16
  )}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
}

async function countUniqueVisitors() {
  const now = Date.now();
  if (cachedCount !== null && now - lastFetchTime < CACHE_DURATION) {
    return cachedCount;
  }

  // Use HEAD + count to avoid pulling all rows back
  const { count, error } = await supabaseAdmin
    .from("visitors")
    .select("visitor_id", { count: "exact", head: true });

  if (error) {
    throw error;
  }

  cachedCount = count ?? 0;
  lastFetchTime = now;
  return cachedCount;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const ip = getClientIp(req);
  const userAgent = body.userAgent || "unknown";
  const referrer = body.referrer || "";
  const pageUrl = body.pageUrl || "";
  const origin = req.headers.get("origin") || req.headers.get("host") || "";
  const incomingSessionId = body.sessionId;
  const sessionId =
    typeof incomingSessionId === "string" && uuidRegex.test(incomingSessionId)
      ? incomingSessionId
      : crypto.randomUUID();
  const nowIso = new Date().toISOString();

  // Deterministic visitor id to de-duplicate the same user quickly
  const visitorId = await hashFingerprint(`${ip}|${userAgent}`);

  // Use built-in geo data when available (no extra network call)
  const country = req.geo?.country || null;
  const city = req.geo?.city || null;

  const visitorData = {
    visitor_id: visitorId,
    session_id: sessionId,
    page_url: pageUrl,
    ip_address: ip,
    user_agent: userAgent,
    referrer,
    origin,
    country,
    city,
    last_seen: nowIso,
    metadata: {
      last_page_url: pageUrl,
      last_referrer: referrer,
      last_origin: origin,
      last_session_id: sessionId,
    },
  };

  // Upsert keeps the row small and avoids an extra SELECT for duplicates.
  // Add a UNIQUE index on visitor_id in Supabase for this to work best.
  const { error: insertError } = await supabaseAdmin
    .from("visitors")
    .upsert(visitorData, { onConflict: "visitor_id", ignoreDuplicates: false });

  if (insertError) {
    console.error("Error inserting visitor data:", insertError);
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  try {
    const uniqueVisitorCount = await countUniqueVisitors();
    return NextResponse.json({
      success: true,
      visitorId,
      sessionId,
      uniqueVisitorCount,
    });
  } catch (error: any) {
    console.error("Error counting visitors:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Lightweight endpoint to fetch just the unique visitor count
export async function GET() {
  try {
    const uniqueVisitorCount = await countUniqueVisitors();
    return NextResponse.json({ count: uniqueVisitorCount });
  } catch (error: any) {
    console.error("Error fetching visitor count:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
