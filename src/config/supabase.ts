import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const anon_key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const url =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_URL ?? "https://xyzcompany.supabase.co";
export const supabase = createClient(url, anon_key);
