<template>
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
  <div class="border-b border-b-neutral pb-3">
    <div class="flex justify-between items-end">
      <div class="text-4xl font-semibold my-4 text-accent">
        {{ blog.title }}
      </div>
      <NuxtLink
        class="btn text-sm btn-outline btn-warning"
        :to="'/admin/blogs/form?id=' + blog.id"
      >
        Edit Blog
      </NuxtLink>
    </div>
    <div class="font-light text-sm">{{ blog.shortenDateTime }}</div>
  </div>

  <!-- CONTENT -->
  <div class="my-4 text-justify">{{ blog.content }}</div>
</template>

<script setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});
const config = useRuntimeConfig();
const apiUri = config.public.apiUri;
const route = useRoute();
const blogID = route.params.id;
const blog = await $fetch(`/api/blog/${blogID}`); // ambil dari nuxt server (/server/api)
</script>
