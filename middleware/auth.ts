export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie("token");
  const AuthStore = useAuthStore();

  if (to.path != "/admin/login") {
    if (!token.value) return navigateTo("/admin/login"); // token check
    if (!AuthStore.user) {
      await AuthStore.getUser(); // if token exist
      if (!AuthStore.user) return navigateTo("/admin/login");
    }
  } else {
    // to login page
    // check token, if exist, to index
    if (token.value) return navigateTo("/admin");
  }
});
