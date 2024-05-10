import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/database.types";

const SUPABASE_URL = "https://fimnikqzkfvvtddjfyrv.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpbW5pa3F6a2Z2dnRkZGpmeXJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUzMTMwNTcsImV4cCI6MjAzMDg4OTA1N30.ityWkOtkPL8FfZbOX-SFxkTH9aXUTtH9AGDW_1GHWI4";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
