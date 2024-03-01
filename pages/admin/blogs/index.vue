<template>
  <div>
    <div
      class="font-semibold border-b-2 pb-3 border-white/30 flex justify-between mb-3"
    >
      <div class="text-xl font-bold"> Blog </div>
      <button
        class="flex btn btn-sm btn-neutral"
        @click="navigateTo('/admin/blogs/create')"
      >
        <LucidePlus class="w-4" />
        Add Blog
      </button>
    </div>
    <div class="grid grid-cols-10 gap-4">
      <input
        type="text"
        placeholder="Type here"
        class="input input-bordered col-span-8 bg-white/30"
        v-model="filter"
      />

      <!-- TODO create alert -->
    </div>
    <div class="mt-3 text-sm col-span-2 flex justify-center items-center">
      <div> Page {{ page }} of {{ BlogStore.maxPage }} </div>
    </div>
    <!-- CONTENT -->
    <div
      class="mt-5 flex flex-col items-center sm:grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
    >
      <!-- PAGINATION -->
      <div class="w-72 max-sm:w-full h-full flex justify-center items-center">
        <button
          class="join-item btn"
          :class="{ 'btn-disabled': page == 1 }"
          @click="page--"
          >{{ page == 1 ? "This is first page" : "See previous page" }}</button
        >
      </div>
      <!-- DATA DRAW -->

      <template v-for="b in dataTable">
        <div class="bg-base-300 p-3 rounded-md w-72 max-sm:w-full">
          <div class="w-full items-center h-full flex justify-between pb-2">
            <NuxtLink
              :to="'/admin/blogs/' + b.id"
              class="font-semibold text-xl hover:text-accent truncate capitalize"
            >
              {{ b.title }}
            </NuxtLink>
            <div class="dropdown dropdown-bottom dropdown-end">
              <div tabindex="0" role="button" class="">
                <LucideMoreHorizontal class="w-10 hover:text-accent" />
              </div>
              <ul
                tabindex="0"
                class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box gap-2"
              >
                <li>
                  <button class="btn btn-sm btn-error py-[3px]">
                    <LucideTrash2 class="w-5" />
                  </button>
                </li>
                <li>
                  <button class="btn btn-sm btn-warning py-[3px]">
                    <LucidePencil class="w-5" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div
            class="flex justify-between w-full items-end pb-1 border-b-2 border-white/30 mb-1"
          >
            <div class="text-xs mb-1">
              {{ dayjs(b.createdAt).format("DD MMM YYYY") }}
            </div>
            <div class="capitalize text-xs"> </div>
          </div>

          <!-- IMAGE -->
          <div
            class="rounded-xl aspect-video overflow-hidden hover:scale-105 duration-300 mt-3"
          >
            <!-- SHOW FIRST PIC -->
            <img
              v-if="b.photos.length"
              :src="apiUri + b.photos[0].path"
              :alt="b.title"
              class="object-contain"
            />
            <!-- SHOW DUMMY PIC -->
            <div v-else class="aspect-video bg-neutral"></div>
          </div>

          <!-- DESCRIPTION -->
          <div class="mt-3 h-10">
            <div class="text-sm line-clamp-2">
              {{ b.content }}
            </div>
          </div>
        </div>
      </template>

      <div
        class="card w-72 max-sm:w-full bg-base-100 flex justify-center items-center"
      >
        <div class="join">
          <button
            class="join-item btn"
            :class="{ 'btn-disabled': page == BlogStore.maxPage }"
            @click="page++"
            >{{
              page == BlogStore.maxPage ? "This is last page" : "See next page"
            }}</button
          >
        </div>
      </div>
    </div>
    <div class="mt-3 text-sm col-span-2 flex justify-center items-center">
      <div> Page {{ page }} of {{ BlogStore.maxPage }} </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from "dayjs";
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});
const config = useRuntimeConfig();
const apiUri = config.public.apiUri;
const BlogStore = useBlogStore();
const page = ref(1);
const limit = ref(5);
const filter = ref("");
onBeforeMount(async () => {
  await BlogStore.get(limit.value, page.value);
});
const dataTable = computed(() => {
  const search = filter.value.toLowerCase().trim();
  if (search != "") {
    return BlogStore.blogs.filter((b) =>
      b.title.toLowerCase().includes(search)
    );
  } else return BlogStore.blogs;
});
watchEffect(async () => {
  await BlogStore.get(limit.value, page.value);
});
</script>
