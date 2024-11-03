// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { supabase } from '$lib/supabase';

export const load = async ({ locals: { getSession }, url }: Parameters<LayoutServerLoad>[0]) => {
  const session = await getSession();

  // If user is not logged in and not on login page, redirect to login
  if (!session && url.pathname !== '/login') {
    throw redirect(303, '/login');
  }

  // If user is logged in and on login page, redirect to appropriate page
  if (session && url.pathname === '/login') {
    const { data: { user } } = await supabase.auth.getUser();
    const isAdmin = user?.user_metadata?.role === 'fe_admin';
    throw redirect(303, isAdmin ? '/admin' : '/profile');
  }

  return {
    session
  };
};