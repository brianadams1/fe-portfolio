<template>
  <div class="px-16">
    <!-- HEADER -->
    <div
      class="flex justify-between items-end my-4 border-b border-b-neutral pt-6 max-md:pt-20 pb-3"
    >
      <NuxtLink to="/" class="text-4xl font-bold">Homepage</NuxtLink>
      <NuxtLink to="/projects/">Back</NuxtLink>
    </div>

    <!-- IMAGE CAROUSEL -->
    <div v-if="project.photos.length">
      <Carousel :items-to-show="1">
        <Slide v-for="slide in project.photos.length" :key="slide">
          <img
            v-for="photo in project.photos"
            :src="api + photo.path"
            class="w-full h-full"
            alt=""
          />
        </Slide>

        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>
    </div>
    <div v-else class="aspect-video bg-netural"></div>

    <!-- TITLE -->
    <div class="border-b border-b-neutral">
      <div class="text-4xl font-semibold my-4 text-accent">
        {{ project.title }}
      </div>
      <div class="flex justify-between">
        <div class="font-light text-sm">
          {{ project.readDateTime }} - {{ project.readEndDateTime }}
        </div>
        <div class=""
          >Project status : <span class="capitalize">{{ status }}</span>
        </div>
      </div>
    </div>

    <!-- TODO draw skill -->
    <!-- DESCRIPTION -->
    <div class="mt-2">
      <div v-if="project.company">
        <span class="font-semibold">Company : </span>{{ project.company }}
      </div>
      <div v-if="project.url">
        <span class="font-semibold">URL : </span>
        <a :href="project.url" target="__blank">
          {{ project.url }}
        </a>
      </div>
      <div class="my-4 text-justify">{{ project.description }}</div>
    </div>
  </div>
</template>

<script setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

const route = useRoute();
const projectID = route.params.id;
const config = useRuntimeConfig();
const api = config.public.apiUri;
const project = await $fetch(`/api/project/${projectID}`); // ambil dari nuxt server (/server/api)
const status = computed(() => {
  return project.status.replaceAll("_", " ").toLowerCase();
});
</script>
<style scoped>
.test {
  text-transform: initial !important;
}
</style>
