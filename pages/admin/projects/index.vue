<template>
  <div class="w-full">
    <div
      class="relative font-semibold text-xl mb-5 pb-2 border-b-2 border-white/30 flex flex-col sm:flex-row justify-between"
    >
      <div class="flex gap-3">
        <LucideFolderKanban :size="24" />
        <p> Projects </p>
      </div>
      <div class="flex justify-end">
        <NuxtLink class="btn btn-neutral btn-sm" to="/admin/projects/new">
          <LucidePlus :size="16" />
          Add project
        </NuxtLink>
      </div>
      <!-- ALERT -->
      <div
        class="mx-auto w-full h-12 mb-2"
        :class="successAlert == true ? 'absolute' : 'hidden'"
      >
        <!-- SUCCESS ALERT -->

        <Transition name="slide-fade" :duration="550">
          <LazyAdminSuccessAlert v-if="successAlert" />
        </Transition>
      </div>
    </div>

    <!-- SEARCH & PAGINATION -->
    <div
      class="flex max-sm:flex-col max-sm:items-end sm:justify-between flex-wrap"
    >
      <input
        @keyup.enter="
          page = 1;
          getData();
        "
        v-model="filter"
        type="text"
        placeholder="Masih nyari? Yakin gamau sama aku aja?"
        class="input input-bordered input-sm mb-3 sm:max-w-xs w-full"
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
        <button class="join-item btn btn-sm"
          >Page {{ page }} of {{ ProjectStore.maxPage }}</button
        >
        <button
          class="join-item btn btn-sm"
          @click="
            page++;
            getData();
          "
          :disabled="page == ProjectStore.maxPage"
          >></button
        >
      </div>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      <div
        v-for="p in ProjectStore.projects"
        class="card card-compact bg-base-100 shadow-xl relative rounded-md overflow-hidden"
      >
        <div class="lg:hidden dropdown dropdown-end absolute top-0 right-0">
          <div
            tabindex="0"
            role="button"
            class="btn btn-sm px-1 rounded-md bg-black/30 m-1 border-0"
          >
            <LucideMoreVertical />
          </div>
          <ul
            tabindex="0"
            class="dropdown-content z-[1] menu shadow bg-neutral-300 rounded-box gap-3"
          >
            <li>
              <NuxtLink
                class="btn btn-warning btn-sm pb-7"
                :to="`/admin/projects/update?id=${p.id}`"
              >
                <LucideFilePenLine :size="20" />
              </NuxtLink>
            </li>
            <li>
              <button
                class="btn btn-error btn-sm pb-7"
                @click="
                  showDeleteModal = true;
                  removeData = p;
                "
              >
                <LucideTrash2 :size="20" />
              </button>
            </li>
          </ul>
        </div>
        <div class="card-body flex-none">
          <h2 class="card-title capitalize max-md:text-base line-clamp-1">
            {{ p.title }}
          </h2>
          <div class="flex max-sm:flex-col justify-between max-sm:gap-1">
            <div class="text-xs">
              {{ p.readDateTime }} - {{ p.readEndDateTime }}
            </div>
            <div class="text-xs font-semibold">{{ p.status }}</div>
          </div>
        </div>
        <figure class="relative">
          <img v-if="p.photos.length" :src="apiUri + p.photos[0].path" />
          <div v-else class="aspect-video w-full bg-neutral/20"></div>
          <div
            class="absolute badge left-1 bottom-1 badge-sm"
            v-if="p.skills.length"
          >
            {{ p.skills.length }} Skills
          </div>
        </figure>
        <div class="card-body grow flex justify-end">
          <div class="flex flex-col gap-0">
            <p v-if="p.company" class="font-semibold text-lg capitalize">{{
              p.company
            }}</p>
            <p class="xl:line-clamp-3 line-clamp-2 text-sm">
              {{ p.description }}
            </p>
          </div>

          <div class="max-lg:hidden flex gap-3 justify-end">
            <NuxtLink
              class="btn btn-warning btn-sm 2xl:btn-md text-xs"
              :to="`/admin/projects/update?id=${p.id}`"
            >
              <LucideFilePenLine :size="20" /> Edit
            </NuxtLink>
            <button
              class="btn btn-error btn-sm 2xl:btn-md text-xs"
              @click="
                showDeleteModal = true;
                removeData = p;
              "
            >
              <LucideTrash2 :size="20" /> Remove
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="ProjectStore.projects.length == 0">
      <SvgNodata class="w-52 md:w-96 mx-auto" />
      <div class="text-xl font-bold text-center mt-5"> Data is not found </div>
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
        <button class="join-item btn btn-sm"
          >Page {{ page }} of {{ ProjectStore.maxPage }}</button
        >
        <button
          class="join-item btn btn-sm"
          @click="
            page++;
            getData();
          "
          :disabled="page == ProjectStore.maxPage"
          >></button
        >
      </div>
    </div>

    <!-- MODALS -->
    <LazyAdminModalConfirm
      v-if="showDeleteModal"
      :show="showDeleteModal"
      text_confirm="Delete"
      @close="showDeleteModal = false"
      @saved="handleRemove"
    >
      <div>
        <p class="font-bold text-2xl mb-3 text-center">Delete</p>
        <p class="mb-3">Are you sure you want to delete this Education?</p>
        <p class="font-semibold mb-3 text-lg" v-if="removeData">
          {{ removeData.title }}
        </p>
        <p class="text-sm">This action cannot be undone.</p>
      </div>
    </LazyAdminModalConfirm>
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
const successAlert = ref(false);
onBeforeMount(async () => {
  await getData();
});

const page = ref(1);
const filter = ref("");
const getData = async () => {
  await ProjectStore.get(page.value, filter.value);
};

const showDeleteModal = ref(false);
const removeData = ref(null);
const handleRemove = async () => {
  if (!removeData.value) return;

  try {
    showDeleteModal.value = false;
    await ProjectStore.remove(removeData.value.id);

    await getData();
    successAlert.value = true;
    setTimeout(() => {
      successAlert.value = false;
    }, 2500);
  } catch (error) {
    console.log(error);
  }
};
</script>
