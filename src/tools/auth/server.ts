import { clientEnv } from '@/lib/env/client'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

/**
 * Helper function to safely get cookies store.
 * Returns the cookie store if in a request scope, null otherwise.
 */
async function getCookieStore() {
  try {
    return await cookies()
  } catch {
    return null
  }
}

export async function createClient() {
  const cookieStore = await getCookieStore()

  return createServerClient(
    clientEnv.SUPABASE_URL,
    clientEnv.SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          // If we have a cookie store (in request scope), use it
          if (cookieStore) {
            return cookieStore.getAll()
          }
          // Otherwise, return empty array (no-op)
          return []
        },
        setAll(cookiesToSet) {
          // If we have a cookie store (in request scope), try to set cookies
          if (cookieStore) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
            } catch {
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          }
          // Otherwise, do nothing (no-op)
        },
      },
    }
  )
}

/**
 * Get the current authenticated user from Supabase.
 * Supports both cookie-based (web) and token-based (mobile) authentication.
 * 
 * Priority:
 * 1. Authorization header (Bearer token) - for mobile apps
 * 2. Cookies - for web/SSR (uses createClient)
 * 
 * @param request - Optional NextRequest to extract headers from (for API routes)
 * @returns The authenticated Supabase user, or null if not authenticated
 */
export async function getCurrentUser(request?: NextRequest) {
  // Try token-based auth first (for mobile apps)
  const authHeader = request?.headers.get("authorization");
  
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    
    // Create a Supabase client with the token
    const supabase = createSupabaseClient(
      clientEnv.SUPABASE_URL,
      clientEnv.SUPABASE_PUBLISHABLE_KEY,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    );
    
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      // Token expired or invalid - return null so client can refresh
      return null;
    }
    
    return user;
  }
  
  // Fall back to cookie-based auth (for web/SSR) - uses createClient
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

/**
 * Get or create a Drizzle User from a Supabase auth user.
 * The Supabase user ID is used as the primary key (no separate field needed).
 * 
 * @param supabaseUser - The authenticated Supabase user
 * @returns The Drizzle User record
 */
export async function getOrCreateUser(supabaseUser: SupabaseUser) {
  // Try to find existing user by Supabase ID
  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.id, supabaseUser.id))
    .limit(1);

  // If user exists, return it
  if (existingUser) {
    return existingUser;
  }

  // If user doesn't exist, create one
  const [newUser] = await db
    .insert(users)
    .values({
      id: supabaseUser.id,
      email: supabaseUser.email ?? '',
      firstName: supabaseUser.user_metadata?.first_name ?? null,
      lastName: supabaseUser.user_metadata?.last_name ?? null,
    })
    .returning();

  return newUser;
}