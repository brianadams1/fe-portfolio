<template>
  <div>
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
const blog = await $fetch(`/api/blogs/${blogID}`);
</script>
