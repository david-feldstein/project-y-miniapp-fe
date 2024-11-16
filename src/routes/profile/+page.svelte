<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { supabase } from '$lib/supabase';
  import { Loader2 } from 'lucide-svelte';
  import { toast } from "svelte-sonner";
  import BankSelectionModal from "$lib/components/BankSelectionModal.svelte";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { invalidateAll } from "$app/navigation";

  export let data;
  let bankSelectionOpen = false;
  let processingCallback = false;

  async function handleSignOut() {
    await supabase.auth.signOut();
  }

  function handleConnectAccount() {
    bankSelectionOpen = true;
  }

  async function processCallbackRef(ref: string) {
    try {
      processingCallback = true;
      
      const { error: fnError } = await supabase.functions.invoke('gocardless-save-accounts', {
        body: { ref }
      });
      
      if (fnError) throw fnError;
      
      toast.success('Bank account connected successfully!');
      await invalidateAll(); // This will refresh the accounts data
    } catch (e) {
      toast.error('Failed to connect bank account');
    } finally {
      processingCallback = false;
    }
  }

  onMount(() => {
    const ref = $page.url.searchParams.get('ref');
    if (ref) {
      processCallbackRef(ref);
    }
  });
</script>

{#if processingCallback}
  <div class="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
    <div class="flex flex-col items-center space-y-4">
      <Loader2 class="h-8 w-8 animate-spin" />
      <p class="text-sm">Connecting your bank account...</p>
    </div>
  </div>
{/if}

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <h1 class="text-3xl font-bold">Profile</h1>
    <Button variant="outline" on:click={handleSignOut}>Sign out</Button>
  </div>
  
  <div class="bg-card p-6 rounded-lg shadow">
    <div>USER JWT: <input style="border:1px solid #fff;background-color:#000;" value="{!!localStorage ? JSON.parse(localStorage.getItem('sb-orytbwnktornhbzhvkde-auth-token')).access_token : ''}" /></div>
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
                      {#if account.trans_state == 'loading'}
                        <Loader2 class="h-4 w-4 animate-spin mr-2" />
                      {:else}
                        ✅
                      {/if}
                      Loading transactions...
                    </div>
                    {#if ['loaded', 'classifying'].includes(account.trans_state)}
                      <div class="flex items-center">
                        {#if ['loaded', 'classifying'].includes(account.trans_state)}
                          <Loader2 class="h-4 w-4 animate-spin mr-2" />
                        {:else}
                          ✅
                        {/if}
                        Classifying transactions...
                      </div>
                    {/if}
                  {:else}
                    ✅ Transactions successfully loaded
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