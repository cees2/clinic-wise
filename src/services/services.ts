import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

export const supabaseURL = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient<Database>(supabaseURL, supabaseKey);
