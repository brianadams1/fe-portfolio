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
        console.log(error);
      }
    },
    //post
    async post(path, data){
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
        return userData
      } catch (error) {
        console.log(error)
      }

    },
    //put
    //patch
    //delete
    async delete(path) {
      // const config = useRuntimeConfig();
      // const apiUri = config.public.apiUri;
      // try {
      //   const data = await $fetch(apiUri + path, {
      //     method: "GET",
      //     headers: { "Content-Type": "application/json" },
      //     credentials: "include",
      //   });
      //   return data
      // } catch (error) {
      //   console.log(error);
      // }
      // get api uri
      const config = useRuntimeConfig();
      const apiUri = config.public.apiUri;
      try {
        const data = await $fetch(apiUri + path, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        return data
      } catch (error) {
        console.log(error)
      }
    },
  },
});
