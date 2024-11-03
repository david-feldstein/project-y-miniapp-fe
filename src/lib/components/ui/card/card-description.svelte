<script lang="ts">
	import { cn } from "$lib/utils";
	import type { HTMLParagraphAttributes } from "svelte/elements";

	type $$Props = HTMLParagraphAttributes;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<p class={cn("text-sm text-muted-foreground", className)} {...$$restProps}>
	<slot />
</p>