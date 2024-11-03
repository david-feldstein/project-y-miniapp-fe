import { r as redirect } from "../../chunks/index.js";
import { s as supabase } from "../../chunks/supabase.js";
const load = async ({ locals: { getSession }, url }) => {
  const session = await getSession();
  if (!session && url.pathname !== "/login") {
    throw redirect(303, "/login");
  }
  if (session && url.pathname === "/login") {
    const { data: { user } } = await supabase.auth.getUser();
    const isAdmin = user?.user_metadata?.role === "fe_admin";
    throw redirect(303, isAdmin ? "/admin" : "/profile");
  }
  return {
    session
  };
};
export {
  load
};
