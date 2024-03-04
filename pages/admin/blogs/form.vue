<template>
  <!-- DRAW DATA IF UPDATE -->
  <div v-if="data" class="flex flex-col min-h-[700px]">
    <!-- MODAL CONFIRM -->
    <AdminModalConfirm
      :show="showUpdate"
      @saved="updateBlog"
      @close="showUpdate = false"
      text_confirm="Update Blog"
    >
      <div> Update </div>
      <div> Are you sure to save these changes? </div>
    </AdminModalConfirm>
    <!-- CONTENT -->
    <div
      class="h-10 flex my-3 justify-between items-end pb-3 border-b border-white/30"
    >
      <h3 class="font-bold text-xl"> Update blog </h3>
    </div>
    <div class="relative">
      <!-- ALERT -->
      <div class="mx-auto w-full absolute h-12 top-0 mb-2">
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
    <!-- FORM -->
    <div class="flex flex-col grow">
      <div class="flex flex-col grow">
        <!-- BLOG TITLE -->
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text"> Blog Title </span>
          </div>
          <input
            type="text"
            class="input input-bordered w-full"
            v-model="data.title"
          />
        </label>
        <!-- BLOG PHOTO -->
        <div class="w-full max-w-full">
          <div class="label label-text pb-3 items-end"> Avatar </div>
          <form class="flex items-center flex-col space-x-6 gap-3 mx-auto">
            <div class="shrink-0">
              <div
                v-if="!avatar"
                class="w-40 aspect-square bg-white lg:mx-auto rounded-lg"
              ></div>
              <div v-else>
                <img
                  v-for="av in avatar"
                  :src="av"
                  :alt="BlogStore.title"
                  class="max-md:w-24 max-md:h-24 w-60 h-60 rounded-lg"
                />
              </div>
            </div>
            <label class="block">
              <span class="sr-only">Choose profile photo</span>
              <input
                type="file"
                accept="image/*"
                @change="handleFile"
                class="cursor-pointer block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
              />
            </label>
          </form>
        </div>
        <!-- BLOG CONTENT -->
        <label class="form-control w-full flex flex-col grow">
          <div class="label">
            <span class="label-text"> Blog Content </span>
          </div>
          <textarea
            class="input input-bordered w-full grow"
            v-model="data.content"
          ></textarea>
        </label>
      </div>
      <div class="flex items-end justify-end mt-5">
        <button @click="showUpdate = true" class="btn btn-primary">
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Joi from "joi";

definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});
const config = useRuntimeConfig();
const apiUri = config.public.apiUri;

const errors = ref({});
const fetchError = ref("");
const successAlert = ref(false);
const isLoading = ref(false);

const route = useRoute();
const blogId = route.query.id;
const BlogStore = useBlogStore();
const data = blogId ? await BlogStore.getId(blogId) : null;
const currentPhotosId = data.photos.map((e) => e.id);
const formData = ref({});

// CHECK PHOTOS
let file_avatar = null;
const avatar = ref(data.photos[0].path ? apiUri + data.photos[0].path : null);
const handleFile = (e) => {
  // TAKE FILE
  if (e.target.files.length) {
    const file = e.target.files[0];
    file_avatar = file;
    // convert file to data url
    // readable data in tag <img src>
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      avatar.value = e.target.result;
    };
  }
};

// UPDATE DATA
const showUpdate = ref(false);
const updateBlog = async () => {
  if (isLoading.value == false) {
    showUpdate.value = false;
    isLoading.value = true;

    // reset error
    errors.value = {};
    fetchError.value = "";
    formData.value = {
      title: data.title,
      content: data.content,
    };
    try {
      await BlogStore.update(
        blogId,
        formData.value,
        currentPhotosId,
        file_avatar
      );
      successAlert.value = true;
      setTimeout(() => {
        successAlert.value = false;
      }, 1500);
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
  }
};
</script>
