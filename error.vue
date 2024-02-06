<template>
  <div class="bg-slate-800 min-w-screen min-h-screen flex max-lg:flex-col">
    <div
      class="text-rose-600 text-center gap-3 flex flex-col items-center justify-evenly flex-1"
    >
      <div>
        <NuxtLink to="/" class="btn w-min truncate z-10 mt-5"
          >Back To Home</NuxtLink
        >
      </div>
      <div>
        <a href="/" class="text-rose-600 text-2xl">{{ url.origin }}</a>
      </div>
      <div class="flex flex-col gap-5">
        <div class="text-7xl font-bold">ERROR {{ error.statusCode }}! </div>
        <div class="text-4xl">Oops...</div>
        <div class="text-4xl md:text-5xl lg:text-6xl">
          {{ error.statusMessage || error.message || "Internal Server Error" }}
        </div>
        <div class="text-white error-stack" v-html="error.stack"></div>
      </div>
    </div>
    <div class="grow flex flex-col items-center justify-center gap-5">
      <SvgGalaxy class="w-40" />
      <SvgAstro class="w-[40vh]" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: Object,
});
const url = useRequestURL();
</script>
