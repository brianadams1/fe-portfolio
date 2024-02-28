import { defineStore } from "pinia";
import { useApiStore } from "./apiStore";

export const useBlogStore = defineStore("blog", {
  state: () => ({
    data: null,
  }),
  getters: {
    blogs: (state) => (state.data ? state.data.blogs : []),
    limit: (state) => (state.data ? state.data.limit : 10),
    maxPage: (state) => (state.data ? state.data.maxPage : 1),
    page: (state) => (state.data ? state.data.page : 1),
    total: (state) => (state.data ? state.data.total : 0),
  },
  actions: {
    async get(limit, page) {
      const Api = useApiStore();
      this.data = await Api.get(`/blogs?limit=${limit}&page=${page}`);
    },
    async getId(id) {
      const Api = useApiStore();
      return await Api.get(`/blog/${id}`);
    },
  },
});
