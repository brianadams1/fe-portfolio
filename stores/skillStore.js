import { defineStore } from "pinia";
import { useApiStore } from "./apiStore";

export const useSkillStore = defineStore("skill", {
  state: () => ({
    data: null,
  }),
  actions: {
    async get() {
      const Api = useApiStore();
      this.data = await Api.get("/skills");
    },
  },
});
