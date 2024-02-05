<template>
  <div class="min-h-screen py-12" id="blog">
    <div
      class="rounded-2xl border border-neutral text-xs w-fit px-8 py-2 flex gap-2 items-center uppercase"
    >
      <LucideSend :size="16" />

      Blog
    </div>
    <div class="mt-10">
      <div class="text-4xl font-semibold">Latest Blogs</div>
      <!-- LIST BLOG -->
      <div class="grid grid-cols-2 gap-6 mt-8 cursor-pointer">
        <NuxtLink
          :to="'/blogs/' + blog.id"
          class="col-span-2 md:col-span-1 group hover:bg-secondary p-2 rounded-md"
          v-for="blog in blogs"
        >
          <div
            class="col-span-4 xl:col-span-3 rounded-lg group-hover:scale-110 duration-300 overflow-hidden aspect-video"
          >
            <div
              v-if="!blog.photos.length"
              class="aspect-video bg-neutral"
            ></div>
            <img
              v-else
              :src="api + blog.photos[0].path"
              :alt="blog.title"
              class="object-cover"
            />
          </div>
          <div class="col-span-6 xl:col-span-7 flex flex-col">
            <!-- title -->
            <div
              class="text-2xl font-semibold group-hover:text-accent flex-none"
              >{{ blog.title }}</div
            >
            <div class="grow line-clamp-1 lg:line-clamp-2 xl:line-clamp-3">{{
              blog.content
            }}</div>
            <div class="text-xs flex-none text-white/50">{{
              blog.shortenDateTime
            }}</div>
          </div>
        </NuxtLink>
        <NuxtLink
          to="/blogs"
          class="col-span-2 btn btn-accent w-min truncate mx-auto"
        >
          See all blogs
        </NuxtLink>
      </div>
    </div>

  </div>
</template>

<script setup>
defineProps({ blogs: Array });
const config = useRuntimeConfig();
const api = config.public.apiUri;
</script>
