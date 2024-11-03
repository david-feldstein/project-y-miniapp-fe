import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { B as Button } from "../../../chunks/index2.js";
import "../../../chunks/supabase.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="space-y-6"><div class="flex justify-between items-center"><h1 class="text-3xl font-bold" data-svelte-h="svelte-6v1kh8">Admin Dashboard</h1> ${validate_component(Button, "Button").$$render($$result, { variant: "outline" }, {}, {
    default: () => {
      return `Sign out`;
    }
  })}</div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-svelte-h="svelte-15k256y"><div class="bg-card p-6 rounded-lg shadow"><h2 class="text-xl font-semibold mb-4">Users Overview</h2> </div> <div class="bg-card p-6 rounded-lg shadow"><h2 class="text-xl font-semibold mb-4">System Status</h2> </div></div></div>`;
});
export {
  Page as default
};
