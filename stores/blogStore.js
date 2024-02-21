import { defineStore } from "pinia";
import { useApiStore } from "./apiStore";

export const useBlogStore = defineStore("blog", {
  state: () => ({
    blog: null,
  }),
  actions: {
    async get() {
      const Api = useApiStore();
      let blogs = await Api.get("/blogs");
      this.blog = blogs.data;

      //   this.photos = this.blog.photos
    },
  },
});
