<template>
  <div class="min-h-screen py-12" id="blog">
    <div
      class="rounded-2xl border border-neutral text-xs w-fit px-8 py-2 flex gap-2 items-center uppercase"
    >
      <LucideSend :size="16" />

      Blog
    </div>
    <div class="flex flex-col gap-6 mt-10">
      <!-- blog list -->
      <div
        class="grid grid-cols-10 gap-3 group cursor-pointer hover:bg-secondary rounded-xl p-4"
        v-for="blog in blogs"
      >
      
        <!-- TODO image -->
        <div
          class="aspect-video bg-neutral col-span-4 xl:col-span-3 rounded-lg group-hover:scale-110"
        ></div>
        <div class="col-span-6 xl:col-span-7 flex flex-col">
          <!-- title -->
          <div class="text-2xl font-semibold group-hover:text-accent flex-none">{{
            blog.title
          }}</div>
          <div class="grow line-clamp-1 lg:line-clamp-2 xl:line-clamp-3">{{
            blog.content
          }}</div>

          <!-- TODO generate readable date -->
          <div class="text-xs flex-none text-white/50">{{ blog.createdAt }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ blogs: Array });
</script>
