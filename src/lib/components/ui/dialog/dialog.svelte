<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
	import { cn } from "$lib/utils";

	type $$Props = DialogPrimitive.Props;
	type $$Events = DialogPrimitive.Events;

	export let open = false;
	export let onOpenChange: $$Props["onOpenChange"] = undefined;
</script>

<DialogPrimitive.Root bind:open {onOpenChange} {...$$restProps}>
	<slot />
</DialogPrimitive.Root>