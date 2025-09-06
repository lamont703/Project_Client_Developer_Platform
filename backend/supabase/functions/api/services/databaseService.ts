// Deno global type declaration
declare global {
  const Deno: {
    env: {
      get(key: string): string | undefined
    }
  }
}

// @ts-ignore
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1'

// Create Supabase client for Edge Function
const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export { createClient }

// Core database service - only contains Supabase client initialization
export const databaseService = {
  // This service now only provides the Supabase client
  // All domain-specific methods have been moved to individual service files
}
