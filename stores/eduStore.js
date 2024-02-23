import { defineStore } from "pinia";
import { useApiStore } from "./apiStore";

export const useEducationStore = defineStore("educations", {
  state: () => ({
    educations: null,
  }),
  actions: {
    async get() {
      const Api = useApiStore();
      this.educations = await Api.get("/educations");
    },
    async create(data) {
      const Api = useApiStore();
      data = Validate(isEducation, data);
      await Api.post("/education", data);
    },
    async remove(id) {
      const Api = useApiStore();
      await Api.delete("/education/" + id);
    },
    async update(id, data) {
      const Api = useApiStore();
      data = Validate(isEducation, data);
      await Api.put("/education/" + id, data);
    },
  },
});
