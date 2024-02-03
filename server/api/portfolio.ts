export default defineEventHandler(async (event) => {
  // HANDLE SSR

  const config = useRuntimeConfig()
  const apiUri = config.apiUri
try {
  const response = await $fetch(apiUri + '/portfolio')
  return response
} catch (error) {
  throw error
}

 
  ;
});
