import { defineStore } from "pinia";

export const useApiStore = defineStore("api", {
  state: () => ({}),
  actions: {
    //get
    async get(path) {
      const config = useRuntimeConfig();
      const apiUri = config.public.apiUri;
      try {
        const data = await $fetch(apiUri + path, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        return data;
      } catch (error) {
        this.handleError(error);
      }
    },
    //post
    async post(path, data) {
      // get api uri
      const config = useRuntimeConfig();
      const apiUri = config.public.apiUri;

      const jsonData = JSON.stringify(data);
      try {
        const userData = await $fetch(apiUri + path, {
          method: "POST",
          body: jsonData,
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        return userData;
      } catch (error) {
        this.handleError(error);
      }
    },
    //put
    async put(path, data) {
      // get api uri
      const config = useRuntimeConfig();
      const apiUri = config.public.apiUri;
      if(!data instanceof FormData) {
        data = JSON.stringify(data);
      }
      try {
        const userData = await $fetch(apiUri + path, {
          method: "PUT",
          body: data,
          // below is deleted because it will automatically be mounted
          // head ers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        return userData;
      } catch (error) {
        this.handleError(error);
      }
    },
    //patch
    async patch(path, data) {
      // get api uri
      const config = useRuntimeConfig();
      const apiUri = config.public.apiUri;

      const jsonData = JSON.stringify(data);
      try {
        const userData = await $fetch(apiUri + path, {
          method: "PATCH",
          body: jsonData,
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        return userData;
      } catch (error) {
        this.handleError(error);
      }
    },
    //delete
    async delete(path) {
      // get api uri
      const config = useRuntimeConfig();
      const apiUri = config.public.apiUri;
      try {
        const data = await $fetch(apiUri + path, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        return data;
      } catch (error) {
        this.handleError(error);
      }
    },
    handleError(error) {
      //create method to catch error so it can be used in all methods

      // 401 unauthorized error
      if (error.status == 401) {
        const token = useCookie("token");
        token = "";
        //  throw to login
        return navigateTo("/admin/login");
      }
      if (error.status == 400) throw error;
      // except 401
      throw createError({
        statusCode: error.status || 500, // default code 500
        statusMessage: error.message || "Internal Server Error...", // default message
      });
    },
  },
});
