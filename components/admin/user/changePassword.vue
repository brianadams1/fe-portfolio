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
    <label class="form-control w-full max-w-xs">
      <div class="label label-text pb-0">Old Password </div>
      <input
        v-model="formData.old_password"
        type="password"
        class="input input-bordered w-full max-w-xs"
        autocomplete="off"
      />
    </label>
    <label class="form-control w-full max-w-xs">
      <div class="label label-text pb-0"> New Password </div>
      <input
        v-model="formData.password"
        type="password"
        class="input input-bordered w-full max-w-xs"
        autocomplete="off"
      />
    </label>
    <label class="form-control w-full max-w-xs">
      <div class="label label-text pb-0"> Confirm New Password </div>
      <input
        v-model="formData.password_confirm"
        type="password"
        class="input input-bordered w-full max-w-xs"
        autocomplete="off"
      />
    </label>
    <div class="flex items-center gap-5">
      <label class="btn btn-neutral" @click="confirm = true"> Save </label>
      <SvgCat v-show="isLoading" class="w-10" />
    </div>
    <!-- MODAL CONFIRM -->
    <LazyAdminModalConfirm
    v-if="confirm"
      :show="confirm"
      @close="confirm = false"
      text_confirm="Change password"
      @saved="handleUpdate"
    />
  </div>
</template>

<script setup>
import Joi from "joi";

const AuthStore = useAuthStore();

const errors = ref({});
const fetchError = ref("");
const successAlert = ref(false);
const isLoading = ref(false);
const confirm = ref(false);
const formData = ref({
  old_password: "",
  password: "",
  password_confirm: "",
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
    formData.value = "";
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      isLoading.value = false;

      errors.value = joierror(error);
      confirm.value = false;
    } else {
      isLoading.value = false;

      fetchError.value = error.data.message;
      confirm.value = false;
    }
  }
};
</script>
