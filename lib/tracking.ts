// import { createClient } from "@supabase/supabase-js";

// CREATE TABLE page_views (
//     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//     page_url TEXT NOT NULL,
//     visitor_id TEXT NOT NULL,
//     session_id TEXT NOT NULL,
//     timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
//     source TEXT,
//     location TEXT,
//     device TEXT,
//     browser TEXT,
//     referrer TEXT
//   );

// const supabase = createClient("YOUR_SUPABASE_URL", "YOUR_SUPABASE_ANON_KEY");
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
// const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function trackPageView(data: {
  pageUrl: string;
  visitorId: string;
  sessionId: string;
  source: string;
  location: string;
  device: string;
  browser: string;
  referrer: string;
}) {
  try {
    await supabase.from("page_views").insert([data]);
  } catch (error) {
    console.error("Error tracking page view:", error);
  }
}

export async function getUniquePageViews(pageUrl: string): Promise<number> {
  //   const { count } = await supabase
  //     .from("page_views")
  //     .select("visitor_id", { count: "exact", head: true, distinct: true })
  //     .eq("page_url", pageUrl);

  //   const { data, error } = await supabase
  //     .from("page_views")
  //     .select("count(distinct visitor_id)", { count: "exact" })
  //     .eq("page_url", pageUrl)
  //     .single();

  //   console.log("Data: ", data);URL
  // URL

  const { data, error } = await supabase.rpc("get_unique_visitors_count", {
    url: pageUrl,
  });
  const count = data ? data.count : 0;

  if (error) {
    console.error("Error fetching unique visitors count:", error);
    return 0; // or handle the error as appropriate for your application
  }

  return count;
}
