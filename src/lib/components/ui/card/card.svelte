<script lang="ts">
	import { cn } from "$lib/utils";
	import type { HTMLDivAttributes } from "svelte/elements";

	type $$Props = HTMLDivAttributes;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<div
	class={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}
	{...$$restProps}
>
	<slot />
</div>