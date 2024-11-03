// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { supabase } from '$lib/supabase';

export const load = async ({ locals: { getSession } }: Parameters<LayoutServerLoad>[0]) => {
  const session = await getSession();
  
  if (!session) {
    throw redirect(303, '/login');
  }

  const { data: { user_metadata } } = await supabase.auth.getUser();
  
  if (user_metadata?.role !== 'fe_admin') {
    throw redirect(303, '/profile');
  }

  return {};
};