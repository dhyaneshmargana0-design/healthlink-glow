// src/lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// ---- REPLACE these two strings with your SUPABASE values ----
// Example URL: https://leumgpdwnxhwrikkopye.supabase.co
const SUPABASE_URL = "https://leumgpdwnxhwrikkopye.supabase.co";

// Example anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6...
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxldW1ncGR3bnhod3Jpa2tvcHllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0Mzg0ODYsImV4cCI6MjA3MzAxNDQ4Nn0.dNgPgGk9fdZ2Em_OdiSkNudcBX7Vmf0lkkaUaSD8Pnw";
// -------------------------------------------------------------

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
export default supabase;