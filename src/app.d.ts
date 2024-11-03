/// <reference types="@sveltejs/kit" />
declare global {
  namespace App {
    interface Locals {
      getSession: () => Promise<import('@supabase/supabase-js').Session | null>
    }
  }
}

export {};