export default defineNuxtRouteMiddleware(async(to, from) => {
  // handle fetch profile data
  const useProfile = useState("profile");
  
  if (!useProfile.value) {
    const fetchProfile = await $fetch("/api/profile");
    useProfile.value = fetchProfile;
  }
});

 /*
 
 fungsi state management: 
 1. share data antar page
 2. gaperlu fetch data yg sama
 3. membuat method di dalam state 
 
 */ 