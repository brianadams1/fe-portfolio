<template>
  <div class="min-h-screen py-12" id="project">
    <div
      class="rounded-2xl border border-neutral text-xs w-fit px-4 py-2 flex gap-2 items-center uppercase"
    >
      <LucideLayoutPanelLeft :size="12" />
      <div> Project </div>
    </div>
    <div class="mt-10">
      <div class="text-4xl font-semibold">Latest Projects</div>
      <!-- list project -->
      <div class="grid grid-cols-2 gap-6 mt-8">
        <!-- project item -->
        <div class="col-span-2 md:col-span-1 group" v-for="p in 4">
          <div class="flex justify-between items-end mb-2">
            <div
              class="font-semibold text-lg text-secondary uppercase group-hover:text-accent"
              >Judul Project</div
            >
            <div class="text-sm">Jan 20th, 2020</div>
          </div>
          <!-- image -->
          <div
            class="aspect-video bg-neutral rounded-xl group-hover:scale-105 duration-300"
          ></div>
          <!-- skill -->
          <div class="flex gap-2 flex-nowrap overflow-x-auto mt-2 pb-2">
            <div
              v-for="n in 10"
              class="border-neutral border rounded-xl px-3 mt-2 text-nowrap"
              >Skill {{ n }}</div
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
