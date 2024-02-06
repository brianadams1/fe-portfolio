<template>
  <div class="max-w-7xl mx-auto px-4">
    <!-- HEADER -->
    <IndexHeader :title="'Blogs'" :url="'/blog'" />

    <div>
      <Carousel :items-to-show="1.5" :wrapAround="true" :autoplay="3000">
        <Slide v-for="p in blog.photos" :key="p.id">
          <div class="aspect-video w-full">
            <div class="w-full h-full flex justify-center bg-contain">
              <img :src="apiUri + p.path" class="h-full" :alt="blog.title" />
            </div>
          </div>
        </Slide>

        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>
    </div>

    <!-- TITLE -->
    <div class="border-b border-b-neutral">
      <div class="text-4xl font-semibold my-4 text-accent">{{
        blog.title
      }}</div>
      <div class="font-light text-sm">{{ blog.shortenDateTime }}</div>
    </div>

    <!-- CONTENT -->
    <div class="my-4 text-justify">{{ blog.content }}</div>
  </div>
</template>
<script setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
definePageMeta({
  middleware: ["profile"], //value based on filename in middleware folder
});

const route = useRoute();
const blogID = route.params.id;
const blog = await $fetch(`/api/blog/${blogID}`); // ambil dari nuxt server (/server/api)

// SEO and META
const { value: useProfile } = useState("profile");
const fullname = `${useProfile.firstName} ${useProfile.lastName}`;
const config = useRuntimeConfig();
const apiUri = config.public.apiUri;

const firstPhoto = blog.photos.length ? apiUri + blog.photos[0].path : "";
useSeoMeta({
  title: blog.title + " - " + fullname + " Blog",
  description: blog.content,
  ogTitle: blog.title,
  ogDescription: blog.content,
  ogImage: firstPhoto,
  twitterCard: "summary_large_image",
});
// END SEO and META
</script>
