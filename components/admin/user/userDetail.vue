<template>
  <div class="flex flex-col gap-4">
    <label class="form-control w-full max-w-xs">
      <div class="label label-text pb-0"> Name </div>
      <input
        v-model="formData.name"
        type="text"
        class="input input-bordered w-full max-w-xs"
        autocomplete="off"
      />
      <div class="text-error text-right text-sm pr-2 pt-2" v-if="errors.name">
        {{ errors.name }}
      </div>
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
      <div class="text-error text-right text-sm pr-2 pt-2" v-if="errors.email">
        {{ errors.email }}
      </div>
    </label>
    <div class="flex items-center gap-5">
      <label class="btn btn-neutral" @click="confirm = true"> Save </label>
      <div class="text-error text-sm pt-5 text-center">{{ fetchError }}</div>
    </div>
    <!-- Put this part before </body> tag -->
    <AdminModalConfirm
      :show="confirm"
      @close="confirm = false"
      @saved="handleUpdate"
    />

    <!-- MODAL SUCCESS -->
    <!-- Put this part before </body> tag -->
    <AdminModalSuccess :show="success" @close="success = false" />
  </div>
</template>

<script setup>
import Joi from "joi";

const AuthStore = useAuthStore();

const errors = ref({});
const fetchError = ref("");
const success = ref(false);
const confirm = ref(false);
const formData = ref({
  name: AuthStore.user.name,
  email: AuthStore.user.email,
});
// auth state
const handleUpdate = async () => {
  errors.value = {};
  fetchError.value = "";
  try {
    // fetch login
    await AuthStore.update(formData.value);
    success.value = true;
    confirm.value = false;
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      errors.value = joierror(error);
      confirm.value = false;
    } else {
      fetchError.value = error.data.message;
      confirm.value = false;
    }
  }
};
</script>
