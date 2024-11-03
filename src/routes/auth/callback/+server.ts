import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';

export const GET = async ({ url, cookies }) => {
  const code = url.searchParams.get('code');

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  throw redirect(303, '/');
};