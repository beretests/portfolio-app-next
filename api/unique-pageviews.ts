// pages/api/unique-pageviews.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../lib/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { count } = await supabase
    .from("visitor_logs")
    .select("visitor_id", { count: "exact", head: true })
    .eq("page_url", "/");

  res.status(200).json({ uniquePageviews: count });
}
