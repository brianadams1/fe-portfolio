import { defineStore } from "pinia";
import { useApiStore } from "./apiStore";

export const useExperienceStore = defineStore("experiences", {
  state: () => ({
    experiences: null,
  }),
  actions: {
    async get() {
      const Api = useApiStore();
      this.experiences = await Api.get("/experiences");
    },
    async remove(id) {
      const Api = useApiStore();
      return await Api.delete("/experience/" + id);
    },
    async update(id, data) {
      const Api = useApiStore();
      data = Validate(isExpression, data);
      return await Api.put("/experience/"+id, data);
    },
    async create(data){
      const Api = useApiStore();
      data = Validate(isUpdateEdu, data);
      return await Api.post("/experience", data);
    }
    // async update(data, avatar) {
    //   const Api = useApiStore();
    //   data = Validate(isUpdateProfile, data);

    //   // CARA PERTAMA
    //   const formData = new FormData();
    //   for (let [key, value] of Object.entries(data)) {
    //     // Append to formData
    //     if (value == null) value = "";
    //     formData.append(key, value);
    //   }
    //   if (avatar) {
    //     formData.append("avatar", avatar);
    //   }
    //   this.profile = await Api.put("/profile", formData);
    // },
    // async update2(data, avatar) {
    //   const Api = useApiStore();
    //   data = Validate(isUpdateProfile, data);
    //   this.profile = await Api.put("/profile", data);
    //   if (avatar) {
    //     const formData = new FormData();
    //     formData.append("avatar", avatar);
    //     this.profile = await Api.put("/profile", formData);
    //   }
    // },
  },
});
