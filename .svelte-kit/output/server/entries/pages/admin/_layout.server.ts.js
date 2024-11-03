import { r as redirect } from "../../../chunks/index.js";
import { s as supabase } from "../../../chunks/supabase.js";
const load = async ({ locals: { getSession } }) => {
  const session = await getSession();
  if (!session) {
    throw redirect(303, "/login");
  }
  const { data: { user_metadata } } = await supabase.auth.getUser();
  if (user_metadata?.role !== "fe_admin") {
    throw redirect(303, "/profile");
  }
  return {};
};
export {
  load
};
