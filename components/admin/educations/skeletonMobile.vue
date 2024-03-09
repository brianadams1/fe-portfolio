<template>
  <div v-for="n in 10" class="card w-full bg-base-100 shadow-xl shadow-neutral">
    <div class="card-body max-sm:p-4">
      <div class="flex justify-between">
        <div>
          <div class="skeleton w-40 h-6 my-2"></div>
          <div class="flex justify-between gap-2 my-2">
            <div class="skeleton w-32 h-4"></div>
            <div class="skeleton w-20 h-4"></div>
          </div>
        </div>
        <div class="skeleton w-8 h-8 rounded"></div>
      </div>
      <div class="grid grid-cols-10 gap-3">
        <div class="col-span-6 skeleton w-full h-8 rounded"></div>
        <div class="col-span-4 skeleton w-full h-8 rounded"></div>
      </div>
    </div>
  </div>
</template>
