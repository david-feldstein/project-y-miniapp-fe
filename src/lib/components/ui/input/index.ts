import Root from "./input.svelte";

export type InputEvents = {
	blur: FocusEvent;
	change: Event;
	click: MouseEvent;
	focus: FocusEvent;
	keydown: KeyboardEvent;
	keypress: KeyboardEvent;
	keyup: KeyboardEvent;
	mouseover: MouseEvent;
	mouseenter: MouseEvent;
	mouseleave: MouseEvent;
	paste: ClipboardEvent;
	input: InputEvent;
};

export {
	Root,
	Root as Input
};