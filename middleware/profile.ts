export default defineNuxtRouteMiddleware(async(to, from) => {
  // handle fetch profile data
  const useProfile = useState("profile");
  
  if (!useProfile.value) {
    const fetchProfile = await $fetch("/api/profile");
    useProfile.value = fetchProfile;
  }
});
