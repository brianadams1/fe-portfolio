import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({ user: { name: "", email: "" } }),
  actions: {
    async login(formData) {
      // get api uri
      const config = useRuntimeConfig();
      const apiUri = config.public.apiUri;

      //   convert to json
      const data = JSON.stringify(formData);

      const user = await $fetch(apiUri + "/login", {
        method: "POST",
        body: data,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      this.user = user;
      // REDIRECT TO ADMIN HOMEPAGE
      navigateTo("/admin");
    },
    async logout() {
      // get api uri
      const config = useRuntimeConfig();
      const apiUri = config.public.apiUri;

      await $fetch(apiUri + "/logout", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      // REDIRECT TO LOGIN PAGE
      navigateTo("/admin/login");
    },
  },
});
