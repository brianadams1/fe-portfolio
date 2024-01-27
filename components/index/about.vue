<template>
  <div class="min-h-screen py-12 flex flex-col" id="about">
    <div
      class="rounded-2xl border border-neutral text-xs w-fit px-8 py-2 flex gap-2 items-center uppercase"
    >
      <LucideBarChartHorizontal :size="16" />

      About
    </div>
    <div class="flex flex-col gap-12 mt-10 grow">
      <p class="md:max-lg:text-5xl text-6xl xl:text-7xl leading-tight">
        Say Hi from <span class="text-info">{{ profile.firstName }}</span
        >,<br />
        {{ profile.job }}
      </p>
      <p class="font-light text-white/25">{{ profile.bio }}</p>
      <div class="flex gap-20 grow items-end pb-10">
        <!-- BASED ON YEAR -->
        <div v-if="profile.year_of_exp != 0">
          <div class="text-accent text-4xl font-semibold"
            >{{ profile.year_of_exp }} +</div
          >
          <div class="uppercase"
            >years of <br />
            experience</div
          >
        </div>
        <!-- BASED ON MONTH -->
        <div v-else>
          <div class="text-accent text-4xl font-semibold"
            >{{ profile.month_of_exp }} +</div
          >
          <div class="uppercase"
            >months of <br />
            experience</div
          >
        </div>
        <div>
          <div class="text-accent text-4xl font-semibold"
            >{{ profile.project_count }}+</div
          >
          <div class="uppercase"
            >projects <br />
            completed</div
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  profile: Object,
});
</script>
