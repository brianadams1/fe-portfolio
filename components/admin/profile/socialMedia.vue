<template>
  <div>
    <!-- ALERT -->
    <div class="mx-auto w-[80%]">
      <!-- SUCCESS ALERT -->

      <Transition name="bounce">
        <AdminSuccessAlert v-if="successAlert" />
      </Transition>
    </div>
    <!-- ERROR ALERT -->
    <div class="mx-auto w-[80%]">
      <Transition name="bounce">
        <!-- ERROR FROM NON-FETCH -->
        <AdminErrorAlert v-if="Object.keys(errors).length">
          <div class="flex flex-col">
            <div v-for="e in Object.keys(errors)">{{ errors[e] }}</div>
          </div>
        </AdminErrorAlert>
      </Transition>
      <Transition name="bounce">
        <!-- ERROR FROM FETCH -->

        <AdminErrorAlert v-if="fetchError">
          {{ fetchError }}
        </AdminErrorAlert>
      </Transition>
    </div>
  </div>
  <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
    <div class="flex flex-col gap-5">
      <!-- GITHUB -->
      <label class="form-control w-full md:max-w-xs max-w-full">
        <div class="label label-text pb-3 items-end justify-start gap-2">
          <LucideGithub />
          <div> Github </div>
        </div>
        <input
          v-model="formData.github"
          type="text"
          class="input input-bordered w-full md:max-w-xs max-w-full"
          autocomplete="off"
        />
      </label>
      <!-- GITLAB -->
      <label class="form-control w-full md:max-w-xs max-w-full">
        <div class="label label-text pb-3 items-end justify-start gap-2">
          <LucideGitlab />
          <div> Gitlab </div>
        </div>
        <input
          v-model="formData.gitlab"
          type="text"
          class="input input-bordered w-full md:max-w-xs max-w-full"
          autocomplete="off"
        />
      </label>
      <!-- INSTAGRAM -->
      <label class="form-control w-full md:max-w-xs max-w-full">
        <div class="label label-text pb-3 items-end flex justify-start gap-2">
          <LucideInstagram />
          <div> Instagram </div>
        </div>
        <input
          v-model="formData.instagram"
          type="text"
          class="input input-bordered w-full md:max-w-xs max-w-full"
          autocomplete="off"
        />
      </label>
      <!-- FACEBOOK -->
      <label class="form-control w-full md:max-w-xs max-w-full">
        <div class="label label-text pb-3 items-end justify-start gap-2">
          <LucideFacebook />
          <div> Facebook </div>
        </div>
        <input
          v-model="formData.facebook"
          type="text"
          class="input input-bordered w-full md:max-w-xs max-w-full"
          autocomplete="off"
        />
      </label>
    </div>
    <div class="flex flex-col gap-5">
      <!-- TWITTER -->
      <label class="form-control w-full md:max-w-xs max-w-full">
        <div class="label label-text pb-3 items-end justify-start gap-2">
          <LucideTwitter />
          <div> Twitter </div>
        </div>
        <input
          v-model="formData.twitter"
          type="text"
          class="input input-bordered w-full md:max-w-xs max-w-full"
          autocomplete="off"
        />
      </label>
      <!-- LINKEDIN -->
      <label class="form-control w-full md:max-w-xs max-w-full">
        <div class="label label-text pb-3 items-end justify-start gap-2">
          <LucideLinkedin />
          <div> Linkedin </div>
        </div>
        <input
          v-model="formData.linkedin"
          type="text"
          class="input input-bordered w-full md:max-w-xs max-w-full"
          autocomplete="off"
        />
      </label>
      <!-- DISCORD -->
      <label class="form-control w-full md:max-w-xs max-w-full">
        <div class="label label-text pb-3 items-end justify-start gap-2">
          <LucideBot />
          <div> Discord </div>
        </div>
        <input
          v-model="formData.discord"
          type="text"
          class="input input-bordered w-full md:max-w-xs max-w-full"
          autocomplete="off"
        />
      </label>
    </div>
  </div>
  <div class="flex justify-center pt-5">
    <button class="btn btn-neutral" @click="confirm = true">Update</button>
    <SvgCat v-show="isLoading" class="w-10" />
  </div>
  <AdminModalConfirm
    :show="confirm"
    @close="confirm = false"
    text_confirm="Change Sosmed"
    @saved="handleUpdate"
  />
</template>

<script setup>
import Joi from "joi";

const ProfileStore = useProfileStore();
onBeforeMount(async () => {
  if (ProfileStore.profile == null) await ProfileStore.get();
});

const errors = ref({});
const fetchError = ref("");
const successAlert = ref(false);
const isLoading = ref(false);
const confirm = ref(false);
const formData = ref({
  github: ProfileStore.profile.github,
  gitlab: ProfileStore.profile.gitlab,
  instagram: ProfileStore.profile.instagram,
  facebook: ProfileStore.profile.facebook,
  twitter: ProfileStore.profile.twitter,
  linkedin: ProfileStore.profile.linkedin,
  discord: ProfileStore.profile.discord,
});
const handleUpdate = async () => {
  confirm.value = false;
  isLoading.value = true;
  // reset errors
  errors.value = {};
  fetchError.value = "";
  try {
    await ProfileStore.update(formData.value);
    successAlert.value = true;
    setTimeout(() => {
      successAlert.value = false;
    }, 3000);
    isLoading.value = false;
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      isLoading.value = false;
      errors.value = joierror(error);
    } else {
      isLoading.value = false;
      fetchError.value = error.data.message;
    }
  }
};
</script>
