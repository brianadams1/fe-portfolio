<template>
  <div class="max-w-7xl mx-auto px-4">
    <!-- HEADER -->
    <IndexHeader :title="'Blogs'" :url="'/blog'"/>

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

</script>
