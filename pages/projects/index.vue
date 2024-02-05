<template>
  <div class="w-[90%] mx-auto">
    <IndexHeader :title="'Projects'" :url="'/project'"/>


    <template v-if="projects">
      <!-- pagination -->
      <div class="flex max-md:flex-col justify-between items-end">
        <div class="max-md:w-full text-4xl font-semibold my-6"
          >My latest <span class="text-accent">projects</span>.</div
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
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <template v-for="project in projects.data">
          <ProjectThumbnail
            :project="project"
            class="w-full"
          ></ProjectThumbnail>
        </template>
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
  middleware:['profile']
})
const config = useRuntimeConfig();
const apiUri = config.public.apiUri;

// take projects data from nuxt server
const projects = ref(null);
const maxPage = ref(1);
const page = ref(1);

const fetchData = async () => {
  projects.value = await $fetch("/api/project?page=" + page.value);
  maxPage.value = projects.value.maxPage;
};

// register hook
onBeforeMount(async () => {
  await fetchData();
});

// watch effect
watchEffect(async () => {
  await fetchData();
});
</script>
