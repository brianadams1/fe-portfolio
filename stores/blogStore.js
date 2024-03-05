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
    async get(page = 1, search = "") {
      const Api = useApiStore();
      this.data = await Api.get(
        `/blogs?limit=12&page=${page}&search=${search}`
      );
    },
    async update(id, data, keptPhoto, newPhoto) {
      const Api = useApiStore();
      data = Validate(isBlog, data);

      const formData = new FormData();
      for (let [key, value] of Object.entries(data)) {
        // Append to formData
        if (value == null) value = "";
        formData.append(key, value);
      }
      // put new photo
      if (newPhoto) {
        formData.append("new_photos", newPhoto);
      }
      for (let i = 0; i < keptPhoto.length; i++) {
        formData.append(`photos[${i}]`, keptPhoto[i]);
      }

      await Api.put("/blog/" + id, formData);
      // photos = [photo.id]
      // {photos: [photo.id]}
      // {photos: [4,5,6,7]}
    },
    async remove(id) {
      const Api = useApiStore();
      await Api.delete("/blog/" + id);
    },
    async create(data, photos) {
      const Api = useApiStore();
      data = Validate(isCreateBlog, data);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);

      for (const p of photos) {
        formData.append("photos", p);
      }
      await Api.post("/blog", formData);
    },
  },
});
