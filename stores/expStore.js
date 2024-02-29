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
