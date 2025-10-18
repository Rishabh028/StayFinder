import { createClient } from '@supabase/supabase-js'

// Read environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)