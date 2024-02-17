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
      try {
        const Api = useApiStore();
        data = Validate(loginValidation, data);

        this.user = await Api.post("/login", data);

        // REDIRECT TO ADMIN HOMEPAGE
        navigateTo("/admin");
      } catch (error) {
        throw error;
      }
    },
    async logout() {
      const Api = useApiStore();
      await Api.delete("/logout");

      // REDIRECT TO LOGIN PAGE
      navigateTo("/admin/login");
    },
    async updateUser(data) {
      try {
        const Api = useApiStore();
        data = Validate(userValidation, data)
        this.user = await Api.put("/user", data)
      } catch (error) {
        throw new Error(error);
      }
    },
  },
});
