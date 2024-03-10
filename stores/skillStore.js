import { defineStore } from "pinia";
import { useApiStore } from "./apiStore";

export const useSkillStore = defineStore("skill", {
  state: () => ({
    skills: null,
    categories: [],
    skillsByCategory: [],
  }),
  actions: {
    async get() {
      const Api = useApiStore();
      const minimumDelay = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
      const response = await Promise.all([Api.get("/skills"), minimumDelay]);
      this.skills = response[0];
    },
    async get_categories() {
      const Api = useApiStore();
      this.categories = await Api.get("/skill_categories");
    },
    async get_skill_categories() {
      const Api = useApiStore();
      this.skillsByCategory = await Api.get("/skill_by_category");
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
