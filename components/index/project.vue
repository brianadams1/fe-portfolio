<template>
  <div class="min-h-screen py-12" id="project">
    <div
      class="rounded-2xl border border-neutral text-xs w-fit px-8 py-2 flex gap-2 items-center uppercase"
    >
      <LucideLayoutPanelLeft :size="12" />
      <div> Project </div>
    </div>
    <div class="mt-10">
      <div class="text-4xl font-semibold">Latest Projects</div>
      <!-- LIST PROJECT -->
      <div class="grid grid-cols-2 gap-6 mt-8 cursor-pointer">
        <!-- PROJECT ITEM -->

        <div
          class="col-span-2 md:col-span-1 group hover:bg-secondary p-2 rounded-md"
          v-for="p in projects"
        >
          <div class="flex flex-col mb-2">
            <div
              class="font-semibold text-lg text-secondary uppercase group-hover:text-accent truncate"
              >{{ p.title }}</div
            >
            <div class="text-sm"
              >{{ p.shortenDateTime }} - {{ p.readEndDateTime }}</div
            >
          </div>
          <!-- IMAGE -->
          <div class="rounded-xl aspect-video overflow-hidden group-hover:scale-105 duration-300">
            <!-- DRAW PHOTOS -->
            <img v-if="p.photos.length" :src="api + p.photos[0].path" :alt="p.title">
            <!-- SHOW BLANK BOX -->
            <div v-else
              class="aspect-video bg-neutral rounded-xl group-hover:scale-105 duration-300"
            ></div>
          </div>
          <!-- SKILL -->
          <!-- TODO make skill relationship -->
          <!-- <div class="flex gap-2 flex-nowrap overflow-x-auto mt-2 pb-2">
            <div
              v-for="s in skills.skill"
              class="border-neutral border rounded-xl px-3 mt-2 text-nowrap"
              >Skill {{ s.skill.title }}</div
            > -->
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  projects: Array,
})
const config = useRuntimeConfig()
const api = config.public.apiUri
</script>
