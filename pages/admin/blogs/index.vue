<template>
  <div class="w-full">
    <div
      class="relative font-semibold text-xl mb-5 pb-2 border-b-2 border-white/30 flex flex-col sm:flex-row justify-between"
    >
      <div class="flex gap-3">
        <LucideNewspaper :size="24" />
        <p> Blogs </p>
      </div>
      <div class="flex justify-end">
        <NuxtLink class="btn btn-neutral btn-sm" to="/admin/blogs/new">
          <LucidePlus :size="16" />
          Add blogs
        </NuxtLink>
      </div>
      <!-- ALERT -->
      <div
        class="mx-auto w-full h-12 mb-2"
        :class="successAlert == true ? 'absolute' : 'hidden'"
      >
        <!-- SUCCESS ALERT -->

        <Transition name="slide-fade" :duration="550">
          <AdminSuccessAlert v-if="successAlert" />
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
        placeholder="Search"
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
          >Page {{ page }} of {{ BlogStore.maxPage }}</button
        >
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

    <!-- TODO SUCCESS ALERT -->
    <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      <div
        v-for="b in BlogStore.blogs"
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
                :to="`/admin/blogs/update?id=${b.id}`"
              >
                <LucideFilePenLine :size="20" />
              </NuxtLink>
            </li>
            <li>
              <button
                class="btn btn-error btn-sm pb-7"
                @click="
                  showDeleteModal = true;
                  removeData = b;
                "
              >
                <LucideTrash2 :size="20" />
              </button>
            </li>
          </ul>
        </div>
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
          <div class="max-lg:hidden flex gap-3 justify-end">
            <NuxtLink
              class="btn btn-warning btn-sm 2xl:btn-md text-xs"
              :to="`/admin/blogs/update?id=${b.id}`"
            >
              <LucideFilePenLine :size="20" /> Edit
            </NuxtLink>
            <button
              class="btn btn-error btn-sm 2xl:btn-md text-xs"
              @click="
                showDeleteModal = true;
                removeData = b;
              "
            >
              <LucideTrash2 :size="20" /> Remove
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="BlogStore.blogs.length == 0">
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
          >Page {{ page }} of {{ BlogStore.maxPage }}</button
        >
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

    <!-- MODALS -->
    <AdminModalConfirm
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
    </AdminModalConfirm>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});
const filter = ref("");

const config = useRuntimeConfig();
const apiUri = config.public.apiUri;
const BlogStore = useBlogStore();
const successAlert = ref(false);
onBeforeMount(async () => {
  await getData();
});
const page = ref(1);
const getData = async () => {
  await BlogStore.get(page.value, filter.value);
};
const showDeleteModal = ref(false);
const removeData = ref(null);
const handleRemove = async (id) => {
  if (!removeData.value) return;

  try {
    await BlogStore.remove(removeData.value.id);
    showDeleteModal.value = false;

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
