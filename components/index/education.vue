<template>
  <div class="min-h-screen py-12" id="education">
    <div
      class="rounded-2xl border text-xs w-fit px-8 py-2 flex gap-2 items-center uppercase border-neutral"
    >
      <LucideBarChartHorizontal :size="12" />

      Education
    </div>
    <div class="flex flex-col gap-6 mt-10">
      <p class="text-5xl font-light"
        ><span class="text-info">Education</span></p
      >
      <div class="flex gap-12 group" v-for="e in educations">
        <div class="flex flex-col items-center">
          <LucideCircle
            :size="12"
            class="fill-neutral stroke-non group-hover:fill-accent"
          />
          <div class="w-px grow bg-neutral"></div>
        </div>
        <div class="mb-5">
          <div class="group-hover:text-accent text-white/50 mb-5"
            >{{ e.startYear }} - {{ e.endYear ? e.endYear : "Present" }}</div
          >
          <div class="flex flex-col gap-6 mb-10">
            <div class="flex flex-col gap-3">
              <div class="text-xl lg:text-4xl md:text-2xl">{{
                e.institutionName
              }}</div>
              <div class="text-sm text-white/50" v-if="e.major || e.degree">
                <span v-if="e.major">
                  {{ e.major }}
                </span>
                <span v-if="e.degree"> : {{ e.degree }} </span>
              </div>
            </div>
            <!-- <div class="flex flex-col gap-3">
              <div class="text-xl lg:text-4xl md:text-2xl"
                >Front-End WordPress Developer</div
              >
              <div class="text-sm text-white/50">Envato Market</div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  educations: Object,
});
</script>
