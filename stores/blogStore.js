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
    // CRUD
    // Read
    async get(page = 1, search = "") {
      const Api = useApiStore();

      const response = await Promise.all([
        Api.get(`/blogs?limit=12&page=${page}&search=${search}`),
        delay,
      ]);
      this.data = response[0];
    },
    async getById(id) {
      const Api = useApiStore();
      return Api.get("/blog/" + id);
    },
    // Update
    async update(id, data, new_photos) {
      const Api = useApiStore();
      data = Validate(isUpdateBlog, data);

      // create FORM DATA
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);

      // loop old photos
      for (let i = 0; i < data.photos.length; i++) {
        formData.append(`photos[${i}]`, data.photos[i]);
      }

      // put new photo
      for (const p of new_photos) {
        formData.append("photos", p);
      }

      await Api.put("/blog/" + id, formData);
    },
    // Delete
    async remove(id) {
      const Api = useApiStore();
      await Api.delete("/blog/" + id);
    },
    // Create
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
