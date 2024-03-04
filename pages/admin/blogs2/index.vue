<template>
  <div>
    <div
      class="font-semibold text-xl mb-5 pb-2 border-b-2 border-white/30 flex flex-col sm:flex-row justify-between"
    >
      <div class="flex gap-3">
        <LucideNewspaper :size="24" />
        <p> Blogs </p>
      </div>
      <div>
        <button class="btn btn-neutral btn-sm" @click="">
          <LucidePlus :size="16" />
          Add blogs
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});
const BlogStore = useBlogStore();
onBeforeMount(async () => {
  await getData()
});
const getData = async () => {
  await BlogStore.get();
};
</script>
