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
    async update(data, avatar) {
      const Api = useApiStore();
      data = Validate(isUpdateProfile, data);

      // CARA PERTAMA
      const formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        // Append to formData
        if (value == null) value = "";
        formData.append(key, value);
      }
      console.log(formData);
      if (avatar) {
        formData.append("avatar", avatar);
      }
      this.profile = await Api.put("/profile", formData);
    
      // CARA KEDUA
    },
  },
});
