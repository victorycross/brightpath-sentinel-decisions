// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://alvmdamrwbfkvihgoazt.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsdm1kYW1yd2Jma3ZpaGdvYXp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxMTY0ODQsImV4cCI6MjA1MTY5MjQ4NH0.AajgEBzSt8Li4hSYg50pP7CB_lNUbdDITroVtibCv1I";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);