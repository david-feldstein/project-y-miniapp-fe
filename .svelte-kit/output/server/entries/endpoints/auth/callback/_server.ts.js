import { r as redirect } from "../../../../chunks/index.js";
import { s as supabase } from "../../../../chunks/supabase.js";
const GET = async ({ url, cookies }) => {
  const code = url.searchParams.get("code");
  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }
  throw redirect(303, "/");
};
export {
  GET
};
