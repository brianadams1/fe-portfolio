<template>
  <div>
    <!-- SEARCH & PAGINATION -->
    <div
      class="flex max-sm:flex-col max-sm:items-end sm:justify-between flex-wrap"
    >
      <div class="skeleton w-72 h-8 rounded-lg"></div>

      <div class="join mb-2 h-8">
        <div class="join-item skeleton rounded-lg w-10"></div>
        <div class="join-item skeleton w-24"></div>
        <div class="join-item skeleton rounded-lg w-10"></div>
      </div>
    </div>
    <!-- PROJECTS DRAW -->
    <div class="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-3">
      <div
        v-for="n in 10"
        class="card card-compact bg-base-100 shadow-2xl relative rounded-md overflow-hidden"
      >
        <div
          class="lg:hidden skeleton rounded-lg w-7 h-7 absolute top-1 right-1"
        ></div>
        <div class="card-body flex-none !px-2">
          <h2 class="skeleton w-40 h-7 rounded"> </h2>
          <div class="flex max-sm:flex-col justify-between max-sm:gap-1">
            <div class="flex gap-2">
              <div class="skeleton w-16 h-4"></div>
              <div class="skeleton w-16 h-4"></div>
            </div>
            <div class="skeleton w-16 h-4"></div>
          </div>
        </div>
        <figure class="relative">
          <div
            class="aspect-video skeleton w-full bg-neutral rounded flex justify-center items-center"
          >
          </div>
          <div
            class="absolute skeleton badge left-1 bottom-1 badge-sm w-16 h-4"
          >
          </div>
        </figure>
        <div class="flex flex-col p-2">
          <div class="flex flex-col gap-2 mb-4">
            <div class="skeleton w-32 h-6 rounded-lg"></div>
            <div class="skeleton w-32 h-4 rounded-lg"></div>
          </div>

          <div class="max-lg:hidden flex gap-3 justify-end">
            <div class="skeleton w-20 h-8 rounded-lg"></div>
            <div class="skeleton w-24 h-8 rounded-lg"></div>
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
