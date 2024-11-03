<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { Label } from "$lib/components/ui/label";
  import { supabase } from '$lib/supabase';
  import { Mail } from 'lucide-svelte';

  let email = '';
  let loading = false;
  let error = '';
  let success = false;

  async function handleLogin(event: SubmitEvent) {
    event.preventDefault();
    
    try {
      loading = true;
      error = '';
      success = false;
      
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (signInError) throw signInError;

      success = true;
      email = '';
    } catch (e) {
      if (e instanceof Error) {
        error = e.message;
      } else {
        error = 'An unexpected error occurred';
      }
    } finally {
      loading = false;
    }
  }
</script>

<div class="container flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center">
  <Card class="w-full max-w-lg">
    <CardHeader class="space-y-1">
      <CardTitle class="text-2xl text-center">Welcome back</CardTitle>
      <CardDescription class="text-center">
        Enter your email to sign in to your account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form on:submit={handleLogin} class="space-y-4">
        <div class="space-y-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            bind:value={email}
            required
          />
        </div>

        {#if error}
          <div class="text-sm text-destructive">{error}</div>
        {/if}

        {#if success}
          <div class="text-sm text-green-500">
            Check your email for the login link!
          </div>
        {/if}

        <Button type="submit" class="w-full" disabled={loading}>
          {#if loading}
            <Mail class="mr-2 h-4 w-4 animate-spin" />
            Sending magic link...
          {:else}
            Sign in with Email
          {/if}
        </Button>
      </form>
    </CardContent>
  </Card>
</div>