<template>
  <div>
    <!-- SEARCH & PAGINATION -->
    <div
      class="flex max-sm:flex-col max-sm:items-end sm:justify-between flex-wrap mb-2"
    >
      <div class="skeleton w-72 h-8 rounded-lg"></div>

      <div class="join mb-2 h-8">
        <div class="join-item skeleton rounded-lg w-10"></div>
        <div class="join-item skeleton w-24"></div>
        <div class="join-item skeleton rounded-lg w-10"></div>
      </div>
    </div>
    <!-- BLOGS DRAW -->
    <div class="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      <div
        v-for="n in 10"
        class="card card-compact bg-base-100 shadow-2xl relative rounded-sm overflow-hidden"
      >
        <div class="lg:hidden absolute top-0 right-0"> </div>
        <figure>
          <div class="skeleton aspect-video w-full rounded-lg"> </div>
        </figure>
        <div class="p-3 flex flex-col justify-end">
          <div class="flex flex-col gap-2 mb-3">
            <div class="skeleton w-40 h-6"></div>
            <div class="skeleton w-60 h-4"></div>
            <div class="skeleton w-60 h-4"></div>
          </div>
          <div class="max-lg:hidden flex gap-3 justify-end">
            <div class="skeleton w-20 h-10 rounded-lg"> </div>
            <div class="skeleton w-24 h-10 rounded-lg"> </div>
          </div>
        </div>
      </div>
    </div>

    <!-- LOWER PAGINATION -->
    <div class="flex justify-end items-end">
      <div class="join mb-2 h-8 text-sm text-center leading-8">
        <div class="join-item skeleton rounded-lg w-10"></div>
        <div class="join-item skeleton w-24"> </div>
        <div class="join-item skeleton rounded-lg w-10"></div>
      </div>
    </div>
  </div>
</template>
