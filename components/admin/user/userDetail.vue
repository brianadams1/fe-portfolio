<template>
  <div class="flex flex-col gap-4">
    <!-- ALERT -->
    <div class="mx-auto w-[80%]">
      <!-- SUCCESS ALERT -->

      <Transition name="bounce">
        <LazyAdminSuccessAlert v-if="successAlert" />
      </Transition>
    </div>
    <!-- ERROR ALERT -->
    <div class="mx-auto w-[80%]">
      <Transition name="bounce">
        <!-- ERROR FROM NON-FETCH -->
        <LazyAdminErrorAlert v-if="Object.keys(errors).length">
          <div class="flex flex-col">
            <div v-for="e in Object.keys(errors)">{{ errors[e] }}</div>
          </div>
        </LazyAdminErrorAlert>
      </Transition>
      <Transition name="bounce">
        <!-- ERROR FROM FETCH -->

        <LazyAdminErrorAlert v-if="fetchError">
          {{ fetchError }}
        </LazyAdminErrorAlert>
      </Transition>
    </div>
    <div class="flex flex-col gap-5">
      <label class="form-control w-full max-w-xs">
        <div class="label label-text pb-0"> Name </div>
        <input
          v-model="formData.name"
          type="text"
          class="input input-bordered w-full max-w-xs"
          autocomplete="off"
        />
      </label>
      <label class="form-control w-full max-w-xs">
        <div class="label label-text pb-0"> Email </div>
        <input
          v-model="formData.email"
          type="email"
          class="input input-bordered w-full max-w-xs"
          autocomplete="off"
          disabled
        />
      </label>
      <div class="flex items-center gap-5 w-full max-w-xs">
        <div class="flex items-center gap-3">
          <label class="btn btn-neutral w-" @click="confirm = true">
            Save
          </label>
          <SvgCat v-show="isLoading" class="w-10" />
        </div>
      </div>
    </div>
    <!-- Put this part before </body> tag -->
    <LazyAdminModalConfirm
    v-if="confirm"
      :show="confirm"
      @close="confirm = false"
      text_confirm="Change name"
      @saved="handleUpdate"
    />
  </div>
</template>

<script setup>
import Joi, { object } from "joi";

const AuthStore = useAuthStore();

const errors = ref({});
const fetchError = ref("");
const successAlert = ref(false);
const isLoading = ref(false);
const confirm = ref(false);
const formData = ref({
  name: AuthStore.user.name,
  email: AuthStore.user.email,
});
// auth state
const handleUpdate = async () => {
  confirm.value = false;
  isLoading.value = true;
  // reset errors
  errors.value = {};
  fetchError.value = "";
  try {
    // fetch login
    await AuthStore.update(formData.value);
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
