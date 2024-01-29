<template>
  <div class="min-h-screen py-12" id="experience">
    <div
      class="rounded-2xl border text-xs w-fit px-8 py-2 flex gap-2 items-center uppercase border-neutral"
    >
      <LucideBarChartHorizontal :size="12" />

      Experience
    </div>
    <div class="flex flex-col gap-6 mt-10">
      <p class="text-5xl font-light"
        ><span class="text-info">Experience</span></p
      >
      <div class="flex gap-12 group" v-for="e in experience">
        <div class="flex flex-col items-center">
          <LucideCircle
            :size="12"
            class="fill-neutral stroke-non group-hover:fill-accent"
          />
          <div class="w-px grow bg-neutral"></div>
        </div>
        <div class="mb-10">

          <div class="group-hover:text-accent text-white/50"
            >{{ e.shortenStartDateTime }} - {{ e.shortenEndDateTime }}</div
          >
          <div class="flex flex-col gap-6 mb-10">
            <div class="flex flex-col gap-3">
              <div class="text-xl lg:text-4xl md:text-3xl mt-3">
                {{ e.title }}
              </div>
              <div class="text-sm text-semibold text-white/50">
                {{ e.company }}, {{ e.location }}
              </div>
              <div class="font-light mt-4">{{ e.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const exp = defineProps({
  experience: Array,
});
</script>
