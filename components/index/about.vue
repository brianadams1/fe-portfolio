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
        >, Webflow Designer and Developer
      </p>
      <p class="font-light text-white/25"
        >Since beginning my journey as a freelance designer nearly 8 years ago,
        I've done remote work for agencies, consulted for startups, and
        collaborated with talented people to create digital products for both
        business and consumer use. I'm quietly confident, naturally curious, and
        perpetually working on improving my chopsone design problem at a
        time.</p
      >
      <div class="flex gap-20 grow items-end pb-10">
        <div>
          <div class="text-accent text-4xl font-semibold">10+</div>
          <div class="uppercase"
            >years of <br />
            experience</div
          >
        </div>
        <div>
          <div class="text-accent text-4xl font-semibold">10+</div>
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
