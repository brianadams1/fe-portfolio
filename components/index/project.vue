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
        <!-- TODO create readable date -->
        <div
          class="col-span-2 md:col-span-1 group hover:bg-secondary p-2 rounded-md"
          v-for="p in projects"
        >
          <div class="flex justify-between items-end mb-2">
            <div
              class="font-semibold text-lg text-secondary uppercase group-hover:text-accent"
              >{{ p.title }}</div
            >
            <div class="text-sm">{{ p.startDate }}</div>
          </div>
          <!-- IMAGE -->
          <!-- TODO create photos -->
          <div
            class="aspect-video bg-neutral rounded-xl group-hover:scale-105 duration-300"
          ></div>
          <!-- SKILL -->
          <!-- TODO make skill relationship -->
          <div class="flex gap-2 flex-nowrap overflow-x-auto mt-2 pb-2">
            <div
              v-for="s in skills.skill"
              class="border-neutral border rounded-xl px-3 mt-2 text-nowrap"
              >Skill {{ s.skill.title }}</div
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  projects: Array,
  skills: Object,
});
</script>
