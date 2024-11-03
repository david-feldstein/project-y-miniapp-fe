import type { PageLoad } from './$types';
import { supabase } from '$lib/supabase';

export const load: PageLoad = async () => {
  const { data: accounts } = await supabase
    .from('user_bank_accounts')
    .select('*');

  const { data: transactions } = await supabase
    .from('user_transactions')
    .select('account_id, id');

  // Group transactions by account_id to get count
  const transactionCounts = transactions?.reduce((acc, curr) => {
    acc[curr.account_id] = (acc[curr.account_id] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  return {
    accounts,
    transactionCounts
  };
};