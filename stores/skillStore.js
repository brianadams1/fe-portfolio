import { defineStore } from "pinia";
import { useApiStore } from "./apiStore";

export const useSkillStore = defineStore("skill", {
  state: () => ({
    skills: null,
    categories: [],
  }),
  // getters: {
  //   skills: (state) => (state.data ? state.data.skills : []),
  //   category: (state) => (state.data ? state.data.category : []),
  // },
  actions: {
    async get() {
      const Api = useApiStore();
      this.skills = await Api.get("/skills");
    },
    async get_categories() {
      const Api = useApiStore();
      this.categories = await Api.get("/skill_categories");
    },
    async create(data) {
      const Api = useApiStore();
      return await Api.post("/skill", data);
    },
    async remove(id) {
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
