<script lang="ts">
  import { Dialog, DialogContent, DialogHeader, DialogTitle } from "$lib/components/ui/dialog";
  import { Card } from "$lib/components/ui/card";
  import { Loader2 } from "lucide-svelte";
  import { supabase } from "$lib/supabase";
  
  export let open = false;
  export let onOpenChange: (open: boolean) => void;
  
  interface Institution {
    id: string;
    bic: string;
    name: string;
    transaction_total_days: number;
    logo: string;
  }
  
  let institutions: Institution[] = [];
  let loading = true;
  let error: string | null = null;
  
  async function fetchInstitutions() {
    try {
      const { data, error: fnError } = await supabase.functions.invoke('gocardless-get-institutions');
      if (fnError) throw fnError;
      institutions = data;
    } catch (e) {
      error = e instanceof Error ? e.message : 'Failed to load banks';
    } finally {
      loading = false;
    }
  }
  
  function handleBankSelect(institution: Institution) {
    console.log('Selected bank:', institution);
    // TODO: Implement bank connection flow
  }
  
  $: if (open) {
    loading = true;
    error = null;
    fetchInstitutions();
  }
</script>

<Dialog {open} onOpenChange={onOpenChange}>
  <DialogContent class="sm:max-w-[900px] max-h-[90vh] flex flex-col">
    <div class="p-4 border-b">
      <h2 class="text-lg font-semibold">Select Your Bank</h2>
    </div>
    
    <div class="flex-1 overflow-y-auto p-4">
      {#if loading}
        <div class="flex justify-center items-center min-h-[300px]">
          <Loader2 class="h-8 w-8 animate-spin" />
        </div>
      {:else if error}
        <div class="text-center text-destructive p-4">
          {error}
        </div>
      {:else}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {#each institutions as institution}
            <Card
              class="p-4 hover:bg-accent cursor-pointer transition-colors"
              on:click={() => handleBankSelect(institution)}
              on:keydown={(e) => e.key === 'Enter' && handleBankSelect(institution)}
              role="button"
              tabindex="0"
            >
              <div class="flex flex-col items-center space-y-4">
                <img
                  src={institution.logo}
                  alt={institution.name}
                  class="h-12 w-auto object-contain"
                />
                <div class="text-center">
                  <h3 class="font-medium">{institution.name}</h3>
                  <p class="text-xs text-muted-foreground">
                    {institution.transaction_total_days} days of history
                  </p>
                </div>
              </div>
            </Card>
          {/each}
        </div>
      {/if}
    </div>
  </DialogContent>
</Dialog>