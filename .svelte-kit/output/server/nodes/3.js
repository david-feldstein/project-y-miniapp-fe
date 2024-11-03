

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.Ci2o8-53.js","_app/immutable/chunks/scheduler.CBAVac44.js","_app/immutable/chunks/index.C7U7LASW.js","_app/immutable/chunks/entry.dKuYY2ME.js"];
export const stylesheets = [];
export const fonts = [];
