<template>
  <NuxtLink :to="'/projects/' + project.id" class="group">
    <div class="flex- flex-col">
      <div class="font-semibold text-xl group-hover:text-accent truncate">{{
        project.title
      }}</div>
      <div class="text-sm mb-1"
        >{{ project.readDateTime }} - {{ project.readEndDateTime }}</div
      >
    </div>

    <!-- IMAGE -->
    <div
      class="rounded-xl aspect-video overflow-hidden group-hover:scale-105 duration-300"
    >
      <!-- SHOW FIRST PIC -->
      <img
        v-if="project.photos.length"
        :src="apiUri + project.photos[0].path"
        :alt="project.title"
        class="object-cover"
      />
      <!-- SHOW DUMMY PIC -->
      <div v-else class="aspect-video bg-neutral"></div>
    </div>

    <!-- SKILL -->
    <div class="flex flex-nowrap overflow-hidden gap-2 mt-2">
      <div
        v-for="s in project.skills"
        class="border border-neutral rounded-xl px-3 text-nowrap"
      >
        {{ s.title }}</div
      >
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  project: Object,
});

const config = useRuntimeConfig();
const apiUri = config.public.apiUri;
</script>
