<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { supabase } from '$lib/supabase';

  async function handleSignOut() {
    await supabase.auth.signOut();
  }
</script>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <h1 class="text-3xl font-bold">Profile</h1>
    <Button variant="outline" on:click={handleSignOut}>Sign out</Button>
  </div>
  
  <div class="bg-card p-6 rounded-lg shadow">
    <h2 class="text-xl font-semibold mb-4">Your Information</h2>
    <!-- Add user profile information here -->
  </div>
</div>