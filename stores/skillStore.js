import { defineStore } from "pinia";
import { useApiStore } from "./apiStore";

export const useSkillStore = defineStore("skill", {
  state: () => ({
    data: null,
  }),
  getters: {
    skills: (state) => (state.data ? state.data.skills : []),
    category: (state) => (state.data ? state.data.category : []),
  },
  actions: {
    async get() {
      const Api = useApiStore();

      this.data.skills = await Api.get("/skills");
    },
    async get_categories() {
      const Api = useApiStore();
      this.data.category = await Api.get("/skill_by_category");
    },
    async create(data) {
      const Api = useApiStore();
      return await Api.post("/skill", data);
    },
    async remove(id) {
      console.log("masuk remove");
      const Api = useApiStore();
      return await Api.delete("/skill/" + id);
    },
    async update(id, data) {
      const Api = useApiStore();
      data = Validate(isSkill, data);
      return await Api.put("/skill/" + id, data);
    },
  },
});
