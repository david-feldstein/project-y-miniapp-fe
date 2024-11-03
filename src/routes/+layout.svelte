<script lang="ts">
  import "../app.pcss";
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';
  import { writable } from 'svelte/store';
  import { page } from '$app/stores';
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { Label } from "$lib/components/ui/label";
  import { Mail } from 'lucide-svelte';

  const isLoading = writable(true);
  let session = null;
  let email = '';
  let loginLoading = false;
  let error = '';
  let success = false;

  // Define protected routes and their required roles
  const protectedRoutes = {
    '/admin': ['fe_admin'],
    '/profile': ['fe_admin', 'user'] // accessible to all authenticated users
  };

  function hasAccess(path: string, userRole?: string): boolean {
    const route = Object.entries(protectedRoutes).find(([route]) => 
      path.startsWith(route)
    );

    if (!route) return true; // Public route
    if (!userRole) return false; // No role, no access
    
    return route[1].includes(userRole);
  }

  async function handleLogin(event: Event) {
    event.preventDefault();
    
    try {
      loginLoading = true;
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
      loginLoading = false;
    }
  }

  onMount(async () => {
    // Check initial session
    const { data: { session: initialSession } } = await supabase.auth.getSession();
    session = initialSession;
    
    // Setup auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      session = newSession;
      
      if (event === 'SIGNED_IN') {
        const userRole = newSession?.user?.user_metadata?.role || 'user';
        goto(userRole === 'fe_admin' ? '/admin' : '/profile');
      }
    });

    // Initial route check
    if (session) {
      const userRole = session?.user?.user_metadata?.role || 'user';
      const currentPath = $page.url.pathname;
      
      if (currentPath === '/') {
        goto(userRole === 'fe_admin' ? '/admin' : '/profile');
      }
    }

    isLoading.set(false);
    
    return () => {
      subscription.unsubscribe();
    };
  });

  $: userRole = session?.user?.user_metadata?.role || 'user';
  $: hasRouteAccess = hasAccess($page.url.pathname, userRole);
</script>

{#if $isLoading}
  <div class="min-h-screen bg-background flex items-center justify-center">
    <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
{:else if session && hasRouteAccess}
  <div class="min-h-screen bg-background">
    <main class="container mx-auto py-8 px-4">
      <slot />
    </main>
  </div>
{:else}
  <div class="container flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center">
    <Card class="w-full max-w-lg">
      <CardHeader class="space-y-1">
        <CardTitle class="text-2xl text-center">Welcome back</CardTitle>
        <CardDescription class="text-center">
          {session ? "You don't have access to this page" : "Enter your email to sign in to your account"}
        </CardDescription>
      </CardHeader>
      {#if !session}
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

            <Button type="submit" class="w-full" disabled={loginLoading}>
              {#if loginLoading}
                <Mail class="mr-2 h-4 w-4 animate-spin" />
                Sending magic link...
              {:else}
                Sign in with Email
              {/if}
            </Button>
          </form>
        </CardContent>
      {:else}
        <CardContent>
          <Button 
            variant="outline" 
            class="w-full"
            on:click={() => goto(userRole === 'fe_admin' ? '/admin' : '/profile')}
          >
            Go to your dashboard
          </Button>
        </CardContent>
      {/if}
    </Card>
  </div>
{/if}