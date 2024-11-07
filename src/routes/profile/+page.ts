import type { PageLoad } from './$types';
import { supabase } from '$lib/supabase';

export const load: PageLoad = async () => {
  const { data: accounts } = await supabase
    .from('user_bank_accounts')
    .select('*');

  return {
    accounts
  };
};