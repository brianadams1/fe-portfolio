import { defineStore } from "pinia";
import { useApiStore } from "./apiStore";
import { isUpdateProfile } from "../utils/profileValidation.js";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    profile: null,
    avatar: null,
  }),

  actions: {
    async get() {
      const Api = useApiStore();
      this.profile = await Api.get("/profile");
      this.avatar = this.profile.avatar;
    },
    async update(data) {
      const Api = useApiStore();
      data = Validate(isUpdateProfile, data);
      this.profile = await Api.put("/profile", data);
    },
  },
});
