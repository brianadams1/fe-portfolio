<template>
  <div class="px-16">
    <!-- HEADER -->
    <IndexHeader :title="'Projects'" :url="'/project'"/>

    <!-- project title -->
    <div class="text-4xl font-semibold my-4 text-accent">
      {{ project.title }}
    </div>
    <!-- content -->
    <div class="grid grid-cols-10 gap-6">
      <!-- LEFT SIDE -->
      <div class="col-span-full md:col-span-7">
        <!-- CAROUSEL -->
        <div v-if="project.photos.length">
          <Carousel :items-to-show="1.5" :wrapAround="true" :autoplay="5000">
            <Slide v-for="slide in project.photos.length" :key="slide">
              <img
                v-for="photo in project.photos"
                :src="api + photo.path"
                class="h-full"
                :alt="project.title"
              />
            </Slide>

            <template #addons>
              <Navigation />
              <Pagination />
            </template>
          </Carousel>
        </div>
        <div v-else class="aspect-video bg-netural"></div>
        <!-- DESCRIPTION -->
        <!-- SHOWN ABOVE MEDIUM BREAKPOINT -->
        <div class="my-4 text-justify max-md:hidden">{{
          project.description
        }}</div>
      </div>

      <!-- RIGHT SIDE -->
      <div class="col-span-full md:col-span-3">
        <!-- DATE DETAIL -->
        <div class="font-light text-sm"
          ><span class="font-semibold"> Date : </span>
          {{ project.readDateTime }} - {{ project.readEndDateTime }}
        </div>
        <!-- STATUS DETAIL -->
        <div class=""
          ><span class="font-semibold"> Project status : </span
          ><span class="capitalize">{{ status }}</span>
        </div>
        <!-- COMPANY DETAIL -->
        <div v-if="project.company">
          <span class="font-semibold">Company : </span>{{ project.company }}
        </div>
        <!-- URL DETAIL -->
        <div v-if="project.url">
          <span class="font-semibold">URL : </span>
          <a :href="project.url" target="__blank">
            {{ project.url }}
          </a>
        </div>
        <!-- SKILL DETAIL -->
        <template v-if="project.skills.length">
          <div class="font-semibold mt-4">TECHNOLOGIES : </div>
          <div class="flex gap-4">
            <div
              v-for="skill in project.skills"
              class="badge badge-accent badge-lg badge-outline text-nowrap px-4"
            >
              <div v-html="skill.svg" class="w-5 mr-2 bg-neutral-100 rounded">
              </div>
              {{ skill.title }}
            </div>
          </div>
        </template>
        <!-- SHOWN UNDER MEDIUM BREAKPOINT -->
        <div class="my-4 text-justify md:hidden">{{ project.description }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware:['profile']
})
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
