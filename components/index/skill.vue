<template>
  <div class="min-h-screen py-12" id="skill">
    <div
      class="rounded-2xl border border-neutral text-xs w-fit px-8 py-2 flex gap-2 items-center uppercase"
    >
      <LucideWrench :size="13" />
      <div> Skill </div>
    </div>
    <div class="mt-10">
      <!-- SUBTITLE -->
      <p class="text-4xl font-semibold mb-6">
        Every great <span class="text-secondary">Projects</span> begin with

        <span class="text-accent">Skills</span> to learn
      </p>
      <div v-for="s in skills" class="mb-10">
        <!-- CATEGORY -->
        <div class="font-semibold uppercase text-secondary mb-2">{{
          s.title
        }}</div>
        <div class="flex gap-6 flex-wrap">
          <!-- SKILL LIST -->
          <div v-for="n in s.skill" class="group">
            <!-- SVG -->
            <div
              v-html="n.svg"
              class="aspect-square bg-neutral w-16 rounded-md flex items-center justify-center group-hover:scale-110 duration-300"
            >

            </div>
            <div
              class="text-center group-hover:text-accent text-sm text-nowrap"
            >
              {{ n.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  skills: Array,
});
</script>
