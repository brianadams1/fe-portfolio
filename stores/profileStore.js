import { defineStore } from "pinia";
import { useApiStore } from "./apiStore";
import { isUpdateProfile } from "../utils/profileValidation.js";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    profile: null,
  }),
  getters: {
    avatar: (state) => {
      if (state.profile) return state.profile.avatar;
      else return null;
    },
  },
  actions: {
    async get() {
      const Api = useApiStore();
      this.profile = await Api.get("/profile");
    },
    async update(data, avatar) {
      const Api = useApiStore();
      data = Validate(isUpdateProfile, data);

      // CARA PERTAMA
      const formData = new FormData();
      for (let [key, value] of Object.entries(data)) {
        // Append to formData
        if (value == null) value = "";
        formData.append(key, value);
      }
      if (avatar) {
        formData.append("avatar", avatar);
      }
      this.profile = await Api.put("/profile", formData);
      // CARA KEDUA
    },
  },
});
