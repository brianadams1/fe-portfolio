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
    <!-- LEFT FORM -->
    <div class="flex flex-col gap-5">
      <!-- EMAIL -->
      <label class="form-control w-full md:max-w-xs max-w-full">
        <div class="label label-text pb-3 items-end"> Email </div>
        <input
          v-model="formData.email"
          type="text"
          class="input input-bordered w-full md:max-w-xs max-w-full"
          autocomplete="off"
          disabled
        />
      </label>
      <!-- FIRST NAME -->
      <label class="form-control w-full md:max-w-xs max-w-full">
        <div class="label label-text pb-3 items-end"> First Name </div>
        <input
          v-model="formData.firstName"
          type="text"
          class="input input-bordered w-full md:max-w-xs max-w-full"
          autocomplete="off"
        />
      </label>
      <!-- LAST NAME -->
      <label class="form-control w-full md:max-w-xs max-w-full">
        <div class="label label-text pb-3 items-end"> Last Name </div>
        <input
          v-model="formData.lastName"
          type="text"
          class="input input-bordered w-full md:max-w-xs max-w-full"
          autocomplete="off"
        />
      </label>
      <!-- WEBSITE -->
      <label class="form-control w-full md:max-w-xs max-w-full">
        <div class="label label-text pb-3 items-end"> Website </div>
        <input
          v-model="formData.website"
          type="text"
          class="input input-bordered w-full md:max-w-xs max-w-full"
          autocomplete="off"
        />
      </label>
      <!-- DOB -->
      <label class="form-control w-full md:max-w-xs max-w-full">
        <div class="label label-text pb-3 items-end"> Date of Birth </div>
        <DatePicker v-model="formData.dob" color="gray">
          <template #default="{ togglePopover }">
            <button
              @click="togglePopover"
              class="btn btn-outline border-neutral/25"
            >
              {{ dayjs(formData.dob).format("DD MMMM YYYY") }}
            </button>
          </template>
        </DatePicker>
      </label>
      <!-- JOB -->
      <label class="form-control w-full md:max-w-xs max-w-full">
        <div class="label label-text pb-3 items-end"> Job </div>
        <input
          v-model="formData.job"
          type="text"
          class="input input-bordered w-full md:max-w-xs max-w-full"
          autocomplete="off"
        />
      </label>
      <!-- PHONE -->
      <label class="form-control w-full md:max-w-xs max-w-full">
        <div class="label label-text pb-3 items-end"> Phone </div>
        <input
          v-model="formData.phone"
          type="text"
          class="input input-bordered w-full md:max-w-xs max-w-full"
          autocomplete="off"
        />
      </label>
    </div>
    <!-- RIGHT FORM -->
    <div class="flex flex-col gap-5">
      <!-- ADDRESS -->
      <label class="form-control w-full md:max-w-xs max-w-full">
        <div class="label label-text pb-3 items-end"> Address </div>
        <input
          v-model="formData.address"
          type="text"
          class="input input-bordered w-full md:max-w-xs max-w-full"
          autocomplete="off"
        />
      </label>
      <!-- CITY -->
      <label class="form-control w-full md:max-w-xs max-w-full">
        <div class="label label-text pb-3 items-end"> City </div>
        <input
          v-model="formData.city"
          type="text"
          class="input input-bordered w-full md:max-w-xs max-w-full"
          autocomplete="off"
        />
      </label>
      <!-- COUNTRY -->
      <label class="form-control w-full md:max-w-xs max-w-full">
        <div class="label label-text pb-3 items-end"> Country </div>
        <input
          v-model="formData.country"
          type="text"
          class="input input-bordered w-full md:max-w-xs max-w-full"
          autocomplete="off"
        />
      </label>
      <!-- TODO input avatar file -->
      <!-- AVATAR -->
      <label class="form-control w-full md:max-w-xs max-w-full">
        <div class="label label-text pb-3 items-end"> Avatar </div>
        <form class="flex items-center flex-col space-x-6 gap-3">
          <div class="shrink-0">
            <div
              v-if="!ProfileStore.profile.avatar"
              class="w-40 aspect-square bg-white lg:mx-auto rounded-lg"
            ></div>
            <img
              v-else
              :src="apiUri + ProfileStore.profile.avatar"
              :alt="ProfileStore.profile.firstName"
              class="w-24 h-24 rounded-full"
            />
            <!-- src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
              alt="Current profile photo" -->
          </div>
          <label class="block">
            <span class="sr-only">Choose profile photo</span>
            <input
              type="file"
              class="cursor-pointer block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
            />
          </label>
        </form>
      </label>
      <!-- BIO -->
      <label class="form-control w-full">
        <div class="label label-text pb-3 items-end"> Bio </div>
        <textarea
          v-model="formData.bio"
          class="textarea textarea-bordered w-full"
          rows="5"
          autocomplete="off"
        ></textarea>
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
    text_confirm="Change profile"
    @saved="handleUpdate"
  />
</template>

<script setup>
import Joi from "joi";
import dayjs from "dayjs";
import { DatePicker } from "v-calendar";
const config = useRuntimeConfig();
const apiUri = config.public.apiUri;
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
  email: ProfileStore.profile.email,
  firstName: ProfileStore.profile.firstName,
  lastName: ProfileStore.profile.lastName,
  website: ProfileStore.profile.website,
  dob: ProfileStore.profile.dob,
  address: ProfileStore.profile.address,
  city: ProfileStore.profile.city,
  country: ProfileStore.profile.country,
  job: ProfileStore.profile.job,
  phone: ProfileStore.profile.phone,
  bio: ProfileStore.profile.bio,
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
