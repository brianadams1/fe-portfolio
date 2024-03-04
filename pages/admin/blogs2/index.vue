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
    <div class="flex justify-betwween gap-5">
      <input
        @keyup.enter="search"
        type="text"
        placeholder="Search"
        class="input input-bordered input-sm w-full mb-3"
      />

      <div class="join mb-2">
        <button
          class="join-item btn btn-sm"
          @click="
            page--;
            getData();
          "
          :disabled="page == 1"
          ><</button
        >
        <button class="join-item btn btn-sm">Page {{ page }}</button>
        <button
          class="join-item btn btn-sm"
          @click="
            page++;
            getData();
          "
          :disabled="page == BlogStore.maxPage"
          >></button
        >
      </div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="b in BlogStore.blogs"
        class="card card-compact bg-base-100 shadow-xl"
      >
        <figure>
          <img v-if="b.photos.length" :src="apiUri + b.photos[0].path" />
          <div v-else class="aspect-video w-full bg-neutral/20"></div>
        </figure>
        <div class="card-body">
          <div class="card-title line-clamp-2 capitalize text-lg">{{
            b.title
          }}</div>
          <p
            class="card-title xl:line-clamp-3 line-clamp-2 text-sm font-medium"
            >{{ b.content }}</p
          >
        </div>
      </div>
    </div>
    <div class="flex justify-end mt-5">
      <div class="join mb-2">
        <button
          class="join-item btn btn-sm"
          @click="
            page--;
            getData();
          "
          :disabled="page == 1"
          ><</button
        >
        <button class="join-item btn btn-sm">Page {{ page }}</button>
        <button
          class="join-item btn btn-sm"
          @click="
            page++;
            getData();
          "
          :disabled="page == BlogStore.maxPage"
          >></button
        >
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
  await getData();
});
const page = ref(1);
const getData = async () => {
  await BlogStore.get(page.value);
};
const search = () => {};
</script>
