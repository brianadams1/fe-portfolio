<template>
  <div v-for="n in 10" class="card w-full bg-base-100 shadow-xl shadow-neutral">
    <div class="card-body max-sm:p-4">
      <div class="flex justify-between mb-2">
        <div class="flex items-center gap-3">
          <div class="skeleton w-16 h-16 rounded-md"></div>
          <div class="flex flex-col gap-2">
            <div class="skeleton w-24 h-6"></div>
            <div class="skeleton w-48 h-6"></div>
          </div>
        </div>

        <div class="skeleton w-10 h-10 rounded"> </div>
      </div>

      <div class="flex justify-between flex-wrap items-center">
        <div class="w-32 h-6 rounded skeleton"> </div>
        <div class="w-10 h-10 rounded-full skeleton"></div>
      </div>
    </div>
  </div>
</template>
