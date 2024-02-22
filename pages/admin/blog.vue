<template>
  <div class="flex justify-center">
    <div
      v-if="BlogStore.blog"
      class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 mx-auto"
    >
      <div
        class="card card-compact bg-base-100 shadow-xl mb-5 w-full"
        v-for="b in BlogStore.blog"
      >
        <figure>
          <img :src="apiUri + b.photos[0].path" alt="" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{{ b.title }}</h2>
          <p>{{ b.content }}</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Edit Content</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});
const config = useRuntimeConfig();
const apiUri = config.public.apiUri;
const BlogStore = useBlogStore();
onBeforeMount(async () => {
  if (BlogStore.blog == null) await BlogStore.get();
  console.log(BlogStore.blog.length);
});
</script>
