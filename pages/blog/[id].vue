<template>
  <div class="max-w-7xl mx-auto px-4">
    <!-- HEADER -->
    <div
      class="flex justify-between items-end my-4 border-b border-b-neutral pt-6 max-md:pt-20 pb-3"
    >
      <div class="text-4xl font-bold">{{ fullname }}</div>
      <NuxtLink to="/blog" class="text-xl">BLOG</NuxtLink>
    </div>
    <!-- <div class="my-4">{{ blog.title }}</div>
    <div class="my-4">{{ blog.content }}</div> -->
    <div>
      <Carousel :items-to-show="1.5" :wrapAround="true" :autoplay="3000">
        <Slide v-for="p in blog.photos" :key="p">
          <div class="aspect-video w-full">
            <div class="w-full h-full flex justify-center bg-contain">
              <img :src="api + p.path" class="h-full" :alt="blog.title" />
            </div>
          </div>
        </Slide>

        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  middleware: ["profile"], //value based on filename in middleware folder
});
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

const route = useRoute();
const blogID = route.params.id;
const config = useRuntimeConfig();
const api = config.public.apiUri;
const blog = await $fetch(`/api/blog/${blogID}`); // ambil dari nuxt server (/server/api)

// fetch profile
const useProfile = useState("profile");
const profile = useProfile.value
const fullname = computed(() => {
  return `${profile.firstName} ${profile.lastName}`;
});
</script>
