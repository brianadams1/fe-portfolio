<template>
  <div class="px-16">
    <!-- HEADER -->
    <div class="fkex justify-between my-4 border-b border-b-neutral pt-6 max-md:pt-20 pb-3">
      <div class="text-4xl font-bold">FULLNAME</div>
      <div>BLOG</div>
    </div>
    <div class="my-4">{{ blog.title }}</div>
    <div class="my-4">{{ blog.content }}</div>
    <div>
      <Carousel :items-to-show="1.5">
        <Slide v-for="slide in 10" :key="slide">
          <img v-for="photo in blog.photo" :src="api + photo.path" class="w-full h-full" alt="">
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
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

const route = useRoute();
const blogID = route.params.id;
const config = useRuntimeConfig();
const api = config.public.apiUri;
const blog = await $fetch(`/api/blog/${blogID}`); // ambil dari nuxt server (/server/api)
</script>
