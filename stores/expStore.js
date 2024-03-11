import { defineStore } from "pinia";
import { useApiStore } from "./apiStore";

export const useExperienceStore = defineStore("experiences", {
  state: () => ({
    experiences: null,
  }),
  actions: {
    async get() {
      const Api = useApiStore();

      const response = await Promise.all([Api.get("/experiences"), delay]);
      this.experiences = response[0];
    },
    async remove(id) {
      const Api = useApiStore();
      return await Api.delete("/experience/" + id);
    },
    async update(id, data) {
      const Api = useApiStore();
      data = Validate(isExperience, data);
      return await Api.put("/experience/" + id, data);
    },
    async create(data) {
      const Api = useApiStore();
      data = Validate(isExperience, data);
      return await Api.post("/experience", data);
    },
  },
});
