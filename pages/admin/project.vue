<template>
  <div>
    <div
      class="font-semibold border-b-2 pb-3 border-white/30 flex justify-between mb-3"
    >
      <div class="text-xl font-bold"> Project </div>
      <button class="flex btn btn-sm btn-neutral">
        <LucidePlus class="w-4" />
        Add Project
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
      <div> Page {{ page }} of {{ ProjectStore.maxPage }} </div>
    </div>
    <!-- CONTENT -->
    <div
      class="mt-5 flex flex-col items-center sm:grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
    >
      <div class="w-72 max-sm:w-full h-full flex justify-center items-center">
        <button
          class="join-item btn"
          :class="{ 'btn-disabled': page == 1 }"
          @click="page--"
          >{{ page == 1 ? "This is first page" : "See previous page" }}</button
        >
      </div>
      <!-- DATA DRAW -->

      <template v-for="p in dataTable">
        <div class="bg-base-300 p-3 rounded-md w-72 max-sm:w-full">
          <div class="w-full items-center h-full flex justify-between pb-2">
            <NuxtLink
              :to="'/project/' + p.id"
              class="font-semibold text-xl hover:text-accent truncate"
            >
              {{ p.title }}
            </NuxtLink>
            <div class="dropdown dropdown-bottom dropdown-end">
              <div tabindex="0" role="button" class="">
                <LucideMoreHorizontal class="w-10" />
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
              {{ p.readDateTime }} - {{ p.readEndDateTime }}
            </div>
            <div class="capitalize text-xs"> </div>
          </div>

          <!-- IMAGE -->
          <div
            class="rounded-xl aspect-video overflow-hidden hover:scale-105 duration-300"
          >
            <!-- SHOW FIRST PIC -->
            <img
              v-if="p.photos.length"
              :src="apiUri + p.photos[0].path"
              :alt="p.title"
              class="object-contain"
            />
            <!-- SHOW DUMMY PIC -->
            <div v-else class="aspect-video bg-neutral"></div>
          </div>

          <!-- SKILL -->
          <div class="flex flex-nowrap overflow-hidden gap-2 my-3">
            <div class="border border-white/30 rounded-xl px-3 text-nowrap">
              {{ p.skills.length }} skill(s)
            </div>
          </div>
          <!-- DESCRIPTION -->
          <div> {{ p.description }}</div>
        </div>
      </template>

      <div
        class="card w-72 max-sm:w-full bg-base-100 flex justify-center items-center"
      >
        <div class="join">
          <button
            class="join-item btn"
            :class="{ 'btn-disabled': page == ProjectStore.maxPage }"
            @click="page++"
            >{{
              page == ProjectStore.maxPage
                ? "This is last page"
                : "See next page"
            }}</button
          >
        </div>
      </div>
    </div>
    <div class="mt-3 text-sm col-span-2 flex justify-center items-center">
      <div> Page {{ page }} of {{ ProjectStore.maxPage }} </div>
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
const ProjectStore = useProjectStore();
const page = ref(1);
const limit = ref(6);

const filter = ref("");

onBeforeMount(async () => {
  if (ProjectStore.data == null)
    await ProjectStore.get(limit.value, page.value);
});
const dataTable = computed(() => {
  const search = filter.value.toLowerCase().trim();
  if (search != "") {
    return ProjectStore.projects.filter((p) =>
      p.title.toLowerCase().includes(search)
    );
  } else {
    return ProjectStore.projects;
  }
});
watchEffect(async () => {
  await ProjectStore.get(limit.value, page.value);
});
</script>
