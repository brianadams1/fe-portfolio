export default defineEventHandler(async (event) => {
  // HANDLE SSR
  return await $fetch("http://localhost:5000/portfolio");
 
  ;
});
