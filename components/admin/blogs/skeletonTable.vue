<template>
  <div
    v-for="n in 10"
    class="card card-compact bg-base-100 shadow-xl relative rounded-md overflow-hidden"
  >
    <!-- <div class="lg:hidden skeleton w-8 h-8"> </div> -->
    <div class="skeleton aspect-video mb-5 rounded-md"> </div>
    <div class="skeleton w-40 h-5 mb-2"></div>
    <div class="skeleton w-52 h-3 mb-1"></div>
    <div class="skeleton w-52 h-3 mb-7"></div>
    <div class="max-lg:hidden flex gap-3 justify-end mb-3 mr-2">
      <div class="skeleton w-20 h-10 rounded-md"></div>
      <div class="skeleton w-28 h-10 rounded-md"></div>
    </div>
  </div>
</template>
