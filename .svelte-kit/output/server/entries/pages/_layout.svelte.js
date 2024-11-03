import { c as create_ssr_component } from "../../chunks/ssr.js";
import "../../chunks/client.js";
import "../../chunks/supabase.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="min-h-screen bg-background"><main class="container mx-auto py-8 px-4">${slots.default ? slots.default({}) : ``}</main></div>`;
});
export {
  Layout as default
};
