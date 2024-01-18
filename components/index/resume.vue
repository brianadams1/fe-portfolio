<template>
  <div class="min-h-screen py-12" id="resume">
    <div
      class="rounded-2xl border text-xs w-fit px-4 py-2 flex gap-2 items-center uppercase border-neutral"
    >
      <LucideBarChartHorizontal :size="12" />

      Resume
    </div>
    <div class="flex flex-col gap-6 mt-10">
      <p class="text-5xl font-light"
        >Education & <span class="text-info">Experience</span></p
      >
      <div class="flex gap-12" v-for="n in 2">
        <div class="flex flex-col items-center">
          <LucideCircle :size="12" class="fill-neutral" />
          <div class="w-px grow bg-neutral"></div>
        </div>
        <div class="mb-5">

          <div class="text-white/50 mb-5">2020 - Present</div>
          <div class="flex flex-col gap-6 mb-10">
            <div class="flex flex-col gap-3">
              <div class="text-2xl">Framer Desinger & Developer</div>
              <div class="text-sm text-white/50">Brunodee Agency</div>
            </div>
            <div class="flex flex-col gap-3">
              <div class="text-2xl">Front-End WordPress Developer</div>
              <div class="text-sm text-white/50">Envato Market</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup></script>
