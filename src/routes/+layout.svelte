<script lang="ts">
  import "../app.pcss";
  import { invalidate } from '$app/navigation';
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';

  onMount(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      invalidate('supabase:auth');
    });

    return () => {
      subscription.unsubscribe();
    };
  });
</script>

<div class="min-h-screen bg-background">
  <main class="container mx-auto py-8 px-4">
    <slot />
  </main>
</div>