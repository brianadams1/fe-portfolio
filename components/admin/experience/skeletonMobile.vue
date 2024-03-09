<template>
  <tbody
    v-for="n in 10"
    class="card w-full bg-base-100 shadow-xl shadow-neutral"
  >
    <div class="card-body max-sm:p-4">
      <div class="flex justify-between">
        <div>
          <div class="skeleton w-40 h-6 my-2"></div>

          <div class="skeleton w-20 h-3"></div>
        </div>
        <div class="skeleton w-8 h-8 rounded"></div>
      </div>
      <div class="flex flex-col gap-3 ">
        <div class="skeleton w-full h-6 rounded my-2"></div>
        <div class="skeleton w-full h-6 rounded"></div>
      </div>
    </div>
  </tbody>
</template>
