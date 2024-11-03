import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { B as Button } from "../../../chunks/index2.js";
import "../../../chunks/supabase.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="space-y-6"><div class="flex justify-between items-center"><h1 class="text-3xl font-bold" data-svelte-h="svelte-1wjimy2">Profile</h1> ${validate_component(Button, "Button").$$render($$result, { variant: "outline" }, {}, {
    default: () => {
      return `Sign out`;
    }
  })}</div> <div class="bg-card p-6 rounded-lg shadow" data-svelte-h="svelte-1gpc79r"><h2 class="text-xl font-semibold mb-4">Your Information</h2> </div></div>`;
});
export {
  Page as default
};
