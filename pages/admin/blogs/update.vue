<template>
  <div class="w-full">
    <div
      class="relative font-semibold text-xl mb-5 pb-2 border-b-2 border-white/30 flex flex-col sm:flex-row justify-between"
    >
      <div class="flex gap-3">
        <LucideNewspaper :size="24" />
        <p> Update Blog </p>
      </div>
      <!-- ALERT -->
      <div class="mx-auto w-full h-12 mb-2 absolute">
        <!-- SUCCESS ALERT -->

        <Transition name="slide-fade" :duration="550">
          <AdminSuccessAlert v-if="successAlert" />
        </Transition>
        <Transition name="slide-fade" :duration="550">
          <!-- ERROR ALERT -->
          <!-- ERROR FROM NON-FETCH -->
          <AdminErrorAlert v-if="Object.keys(errors).length">
            <div class="flex flex-col">
              <div v-for="e in Object.keys(errors)">{{ errors[e] }}</div>
            </div>
          </AdminErrorAlert>
        </Transition>
        <Transition name="slide-fade" :duration="550">
          <!-- ERROR FROM FETCH -->

          <AdminErrorAlert v-if="fetchError">
            {{ fetchError }}
          </AdminErrorAlert>
        </Transition>
      </div>
    </div>

    <!-- BLOG TITLE -->
    <label class="form-control w-full">
      <div class="label">
        <span class="label-text"> Blog title </span>
      </div>
      <input
        type="text"
        placeholder="Title"
        class="input input-bordered w-full bg-neutral font-bold"
        v-model="formData.title"
      />
    </label>

    <!-- BLOG PHOTOS -->
    <div class="block">
      <div class="label">
        <span class="label-text"> Blog Photos </span>
      </div>
      <div class="overflow-auto">
        <!-- LOOP PHOTOS -->
        <div class="flex flex-nowrap gap-3">
          <div
            v-if="!photoPreviews.length"
            class="h-40 aspect-video bg-neutral/40 rounded"
          >
          </div>
          <div
            v-for="(p, i) in photoPreviews"
            class="min-w-60 max-w-60 aspect-video rounded-lg bg-neutral/10 flex justify-center items-center relative"
          >
            <img :src="p" class="max-h-full max-w-full" />
            <!-- DROPDOWN -->
            <div
              class="dropdown dropdown-bottom dropdown-end absolute top-0 right-0"
            >
              <div
                tabindex="0"
                role="button"
                class="btn btn-sm px-1 rounded-md bg-black/30 m-1 border-0"
              >
                <LucideMoreVertical :size="16" />
              </div>
              <ul
                tabindex="0"
                class="dropdown-content z-[1] menu p-2 shadow bg-ase-300 rounded-box w-32"
              >
                <li>
                  <button
                    class="btn btn-error btn-sm my-1"
                    @click="
                      photoPreviews.splice(i, 1);
                      photoFiles.splice(i, 1);
                    "
                  >
                    <LucideTrash2 :size="16" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        multiple
        @change="handleFile"
        :disabled="photoPreviews.length >= 10"
        class="mt-2 cursor-pointer block w-full text-sm text-slate-500"
      />
    </div>
    <!-- BLOG CONTENT -->
    <label class="form-control w-full">
      <div class="label">
        <span class="label-text"> Blog Content </span>
      </div>
      <textarea
        v-model="formData.content"
        rows="5"
        placeholder="Content"
        class="w-full bg-base-100 textarea textarea-bordered"
      >
      </textarea>
    </label>
    <!-- BUTTON -->
    <div class="flex justify-end gap-3 my-4">
      <NuxtLink to="/admin/blogs" class="btn btn-error btn-sm">Cancel</NuxtLink>
      <button class="btn btn-info btn-sm" @click="showCreateConfirm = true">
        Update
      </button>
    </div>

    <!-- MODALS -->
    <AdminModalConfirm
      :show="showCreateConfirm"
      text_confirm="Save"
      @close="showCreateConfirm = false"
      @saved="handleSave"
    >
      <div>
        <p class="text-2xl font-semibold mb-3">Update</p>
        <p>Are you sure to save these changes?</p>
      </div>
    </AdminModalConfirm>
  </div>
</template>

<script setup>
import Joi from "joi";
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});
const BlogStore = useBlogStore();

// check query
const route = useRoute();
const { id } = route.query;

const errors = ref({});
const formData = ref({
  title: "",
  content: "",
});
const photoPreviews = ref([]);
const photoFiles = [];
const handleFile = (e) => {
  if (e.target.files.length) {
    for (const file of e.target.files) {
      // convert file to data url
      // readable data in tag <img src>
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        if (photoPreviews.value.length < 10) {
          photoFiles.push(file);
          photoPreviews.value.push(reader.result);
        }
      };
    }
  }
  // reset
  e.target.value = "";
};
// Handle save
const showCreateConfirm = ref(false);
const fetchError = ref("");
const isLoading = ref(false);
const successAlert = ref(false);
const handleSave = async () => {
  errors.value = {};
  fetchError.value = "";
  showCreateConfirm.value = false;
  isLoading.value = true;
  try {
    await BlogStore.create(formData.value, photoFiles);
    successAlert.value = true;
    setTimeout(() => {
      successAlert.value = false;
      navigateTo("/admin/blogs");
    }, 3000);
    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
    if (error instanceof Joi.ValidationError) {
      errors.value = joierror(error);
    } else {
      if (error.data) fetchError.value = error.data.message;
      else console.log(error); //code error
    }
  }
};
</script>
