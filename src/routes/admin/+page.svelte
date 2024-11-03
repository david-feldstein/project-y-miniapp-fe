<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { supabase } from '$lib/supabase';

  async function handleSignOut() {
    await supabase.auth.signOut();
  }
</script>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <h1 class="text-3xl font-bold">Admin Dashboard</h1>
    <Button variant="outline" on:click={handleSignOut}>Sign out</Button>
  </div>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="bg-card p-6 rounded-lg shadow">
      <h2 class="text-xl font-semibold mb-4">Users Overview</h2>
      <!-- Add admin-specific content here -->
    </div>
    
    <div class="bg-card p-6 rounded-lg shadow">
      <h2 class="text-xl font-semibold mb-4">System Status</h2>
      <!-- Add more admin features here -->
    </div>
  </div>
</div>