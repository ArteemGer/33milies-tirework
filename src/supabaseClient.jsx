import { createClient } from "@supabase/supabase-js";

const supabaseURL = 'https://ppwrvouuxbpzoagefkyu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwd3J2b3V1eGJwem9hZ2Vma3l1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyODgyMjMsImV4cCI6MjAxNDg2NDIyM30.0zOn3CODua1yB1wZGfY5ZjDg4RSxevcHr7d5-C1klA8'


export const supabase = createClient(supabaseURL,supabaseAnonKey)