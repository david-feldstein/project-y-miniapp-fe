import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';

export const GET = async ({ url }) => {
  const code = url.searchParams.get('code');

  if (code) {
    const { data: { session } } = await supabase.auth.exchangeCodeForSession(code);
    if (session) {
      const userRole = session.user?.user_metadata?.role || 'user';
      throw redirect(303, userRole === 'fe_admin' ? '/admin' : '/profile');
    }
  }

  throw redirect(303, '/');
};