<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { supabase } from '$lib/supabase';
  import { Loader2 } from 'lucide-svelte';
  import BankSelectionModal from "$lib/components/BankSelectionModal.svelte";

  export let data;
  let bankSelectionOpen = false;

  async function handleSignOut() {
    await supabase.auth.signOut();
  }

  function handleConnectAccount() {
    bankSelectionOpen = true;
  }
</script>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <h1 class="text-3xl font-bold">Profile</h1>
    <Button variant="outline" on:click={handleSignOut}>Sign out</Button>
  </div>
  
  <div class="bg-card p-6 rounded-lg shadow">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold">Connected Bank Accounts</h2>
      <Button on:click={handleConnectAccount}>
        ➕ Connect Account
      </Button>
    </div>

    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left">
        <thead class="text-xs uppercase bg-muted/50">
          <tr>
            <th scope="col" class="px-6 py-3">Account</th>
            <th scope="col" class="px-6 py-3">Institution</th>
            <th scope="col" class="px-6 py-3">Transactions</th>
          </tr>
        </thead>
        <tbody>
          {#if data.accounts && data.accounts.length > 0}
            {#each data.accounts as account}
              <tr class="border-b">
                <td class="px-6 py-4">{account.title}</td>
                <td class="px-6 py-4">{account.institution_title}</td>
                <td class="px-6 py-4">
                  {#if account.trans_state !== 'done'}
                    <div class="flex items-center">
                      <Loader2 class="h-4 w-4 animate-spin mr-2" />
                      Loading...
                    </div>
                  {:else}
                    {data.transactionCounts[account.account_id] || 0}
                  {/if}
                </td>
              </tr>
            {/each}
          {:else}
            <tr>
              <td colspan="3" class="px-6 py-4 text-center text-muted-foreground">
                No bank accounts connected. Click "Connect Account" to add your first account.
              </td>
            </tr>
          {/if}
        </tbody>
      </table>
    </div>
  </div>
</div>

<BankSelectionModal
  open={bankSelectionOpen}
  onOpenChange={(open) => bankSelectionOpen = open}
/>