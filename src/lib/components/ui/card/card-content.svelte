<script lang="ts">
	import { cn } from "$lib/utils";
	import type { HTMLDivAttributes } from "svelte/elements";

	type $$Props = HTMLDivAttributes;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<div class={cn("p-6 pt-0", className)} {...$$restProps}>
	<slot />
</div>