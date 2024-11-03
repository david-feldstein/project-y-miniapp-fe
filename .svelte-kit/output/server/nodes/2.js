import * as server from '../entries/pages/admin/_layout.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/+layout.server.ts";
export const imports = ["_app/immutable/nodes/2.De7xgDNC.js","_app/immutable/chunks/scheduler.CBAVac44.js","_app/immutable/chunks/index.C7U7LASW.js"];
export const stylesheets = [];
export const fonts = [];
