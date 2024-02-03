export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  //   take data from backend
  const config = useRuntimeConfig();
  const apiUri = config.apiUri;

  // return data ke halaman / page
  try {
    return await $fetch(`${apiUri}/blogs/${id}`);
  } catch (error) {
    throw error;
  }
});
