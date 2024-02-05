<template>
  <div class="w-[90%] mx-auto">
    <div
      class="flex justify-between my-4 border-b border-b-neutral pt-6 max-md:pt-20 pb-3"
    >
      <div class="text-4xl font-bold">{{ fullname }}</div>
      <div>BLOG</div>
    </div>

    <template v-if="blogs">
      <!-- pagination -->
      <div class="flex max-md:flex-col justify-between items-end">
        <div class="max-md:w-full text-4xl font-semibold my-6"
          >My latest <span class="text-accent">Blogs</span>.</div
        >
        <div class="join">
          <button
            class="join-item btn"
            :class="{ 'btn-disabled': page == 1 }"
            @click="page--"
            >«</button
          >
          <button class="join-item btn">Page {{ page }}</button>
          <button
            class="join-item btn"
            :class="{ 'btn-disabled': page == maxPage }"
            @click="page++"
            >»</button
          >
        </div>
      </div>
      <!-- Loop data -->
      <div class="grid grid-cols-3 gap-8">
        <NuxtLink
          :to="'/blog/' + blog.id"
          v-for="blog in blogs.data"
          class="w-full group"
        >
          <div class="text-accent text-xl font-bold">{{ blog.title }}</div>
          <div class="text-sm font-light">{{ blog.shortenDateTime }}</div>
          <div class="group-hover:scale-105 duration-300 mt-1">
            <!-- image data -->
            <img
              v-if="blog.photos.length"
              :src="apiUri + blog.photos[0].path"
              alt=""
              class="w-full aspect-video rounded-xl"
            />
            <!-- image dummy -->
            <div v-else class="w-full aspect-video bg-neutral rounded-xl">
            </div>
            <div class="line-clamp-2 font-light">{{ blog.content }}</div>
          </div>
        </NuxtLink>
      </div>
      <div class="w-full justify-center flex my-7">
        <div class="join">
          <button
            class="join-item btn"
            :class="{ 'btn-disabled': page == 1 }"
            @click="page--"
            >«</button
          >
          <button class="join-item btn">Page {{ page }}</button>
          <button
            class="join-item btn"
            :class="{ 'btn-disabled': page == maxPage }"
            @click="page++"
            >»</button
          >
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["profile"],
});

const config = useRuntimeConfig();
const apiUri = config.public.apiUri;

// take blogs data from nuxt server
const blogs = ref(null);
const maxPage = ref(1);
const page = ref(1);

const fetchData = async () => {
  blogs.value = await $fetch("/api/blog?page=" + page.value);
  maxPage.value = blogs.value.maxPage;
};

// register hook
onBeforeMount(async () => {
  await fetchData();
});

// watch effect
watchEffect(async () => {
  await fetchData();
});

// fetch profile
const useProfile = useState("profile");
const profile = useProfile.value;
const fullname = computed(() => {
  return `${profile.firstName} ${profile.lastName}`;
});
</script>
