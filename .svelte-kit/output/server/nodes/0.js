import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.opjLHr3l.js","_app/immutable/chunks/scheduler.CBAVac44.js","_app/immutable/chunks/index.C7U7LASW.js","_app/immutable/chunks/entry.dKuYY2ME.js","_app/immutable/chunks/supabase.B_uemxHd.js","_app/immutable/chunks/preload-helper.C1FmrZbK.js"];
export const stylesheets = ["_app/immutable/assets/0.DXWm2B8J.css"];
export const fonts = [];
