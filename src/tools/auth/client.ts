import { createBrowserClient } from '@supabase/ssr'
import { clientEnv } from '@/lib/env/client'

export function createClient() {
  return createBrowserClient(
    clientEnv.SUPABASE_URL,
    clientEnv.SUPABASE_PUBLISHABLE_KEY
  )
}