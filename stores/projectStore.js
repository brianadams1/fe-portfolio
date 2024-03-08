import { defineStore } from "pinia";
import { useApiStore } from "./apiStore";

export const useProjectStore = defineStore("project", {
  state: () => ({
    data: null,
  }),
  getters: {
    projects: (state) => (state.data ? state.data.projects : []),
    limit: (state) => (state.data ? state.data.limit : 10),
    maxPage: (state) => (state.data ? state.data.maxPage : 1),
    total: (state) => (state.data ? state.data.total : 0),
    page: (state) => (state.data ? state.data.page : 1),
  },
  actions: {
    // CRUD
    // Read
    async get(page = 1, search = "") {
      const Api = useApiStore();
      this.data = await Api.get(
        `/projects?limit=12&page=${page}&search=${search}`
      );
    },
    async getById(id) {
      const Api = useApiStore();
      return Api.get("/project/" + id);
    },
    // Update
    async update(id, data, new_photos) {
      //   const Api = useApiStore();
      //   data = Validate(isUpdateBlog, data);
      //   // create FORM DATA
      //   const formData = new FormData();
      //   formData.append("title", data.title);
      //   formData.append("content", data.content);
      //   // loop old photos
      //   for (let i = 0; i < data.photos.length; i++) {
      //     formData.append(`photos[${i}]`, data.photos[i]);
      //   }
      //   // put new photo
      //   for (const p of new_photos) {
      //     formData.append("photos", p);
      //   }
      //   await Api.put("/blog/" + id, formData);
    },
    // Delete
    async remove(id) {
      const Api = useApiStore();
      await Api.delete("/project/" + id);
    },
    // Create
    async create(data, skills, photos) {
      const Api = useApiStore();
      data = Validate(isCreateProject, data);

      // CREATE FORM DATA
      const formData = new FormData();

      const arrayKeys = Object.keys(data);

      for (const key of arrayKeys) {
        formData.append(key, data[key]);
      }

      // INSERT SKILLS TO PROJECT.SKILLS
      for (let i = 0; i < skills.length; i++) {
        const id = skills[i];

        formData.append(`skills[${i}]`, id);
      }

      // APPEND PHOTOS WITH LOOP
      for (const p of photos) {
        formData.append("photos", p);
      }
      await Api.post("/project", formData);
    },
  },
});
