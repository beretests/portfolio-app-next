import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseSecretKey = process.env.NEXT_SUPABASE_SECRET_API_KEY!;

// Server-side client using the secret API key (do not expose to the browser).
export const supabaseAdmin = createClient(supabaseUrl, supabaseSecretKey);
