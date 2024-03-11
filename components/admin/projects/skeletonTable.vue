<template>
  <div
    v-for="n in 10"
    class="card card-compact bg-base-100 shadow-xl relative rounded-md overflow-hidden p-2"
  >
    <!-- <div class="lg:hidden skeleton w-8 h-8"> </div> -->
    <div class="flex justify-between m-1">
      <div class="flex flex-col gap-2 w-full">
        <div class="skeleton w-40 h-5 mb-1"></div>
        <div class="flex justify-between mb-2">
          <div class="flex gap-1">
            <div class="skeleton w-20 h-3"></div>
            <div class="skeleton w-20 h-3"></div>
          </div>
          <div class="skeleton w-20 h-3"> </div>
        </div>
      </div>
      <div class="skeleton w-8 h-8 rounded lg:hidden"></div>
    </div>
    <div class="skeleton w-full h-40 mb-3 rounded-md"> </div>
    <div class="skeleton w-40 h-5 mb-2"></div>
    <div class="skeleton w-52 h-3 mb-1"></div>
    <div class="skeleton w-52 h-3 mb-2"></div>
    <div class="max-lg:hidden flex gap-3 justify-end mb-4 mr-2">
      <div class="skeleton w-20 h-8 rounded-lg"></div>
      <div class="skeleton w-20 h-8 rounded-lg"></div>
    </div>
  </div>
</template>
