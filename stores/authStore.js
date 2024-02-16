import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({ user: null }),
  actions: {
    async getUser() {
      // get api uri
      const Api = useApiStore();
      this.user = await Api.get("/user");
    },
    async login(data) {
      const Api = useApiStore();

      this.user = await Api.post("/login", data);

      // REDIRECT TO ADMIN HOMEPAGE
      navigateTo("/admin");
    },
    async logout() {
      const Api = useApiStore();
      await Api.delete("/logout");

      // REDIRECT TO LOGIN PAGE
      navigateTo("/admin/login");
    },
  },
});
