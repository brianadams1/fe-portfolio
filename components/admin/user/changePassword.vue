import type { AdminModalConfirm } from '#build/components';
<template>
  <div class="flex flex-col gap-4">
    <label class="form-control w-full max-w-xs">
      <div class="label label-text pb-0">Old Password </div>
      <input
        v-model="formData.old_password"
        type="password"
        class="input input-bordered w-full max-w-xs"
        autocomplete="off"
      />
      <div
        class="text-error text-right text-sm pr-2 pt-2"
        v-if="errors.old_password"
      >
        {{ errors.old_password }}
      </div>
    </label>
    <label class="form-control w-full max-w-xs">
      <div class="label label-text pb-0"> New Password </div>
      <input
        v-model="formData.password"
        type="password"
        class="input input-bordered w-full max-w-xs"
        autocomplete="off"
      />
      <div
        class="text-error text-right text-sm pr-2 pt-2"
        v-if="errors.password"
      >
        {{ errors.password }}
      </div>
    </label>
    <label class="form-control w-full max-w-xs">
      <div class="label label-text pb-0"> Confirm New Password </div>
      <input
        v-model="formData.password_confirm"
        type="password"
        class="input input-bordered w-full max-w-xs"
        autocomplete="off"
      />
      <div
        class="text-error text-right text-sm pr-2 pt-2"
        v-if="errors.password_confirm"
      >
        {{ errors.password_confirm }}
      </div>
    </label>
    <div class="flex items-center gap-5">
      <label class="btn btn-neutral" @click="confirm = true"> Save </label>
      <div class="text-error text-sm pt-5 text-center">{{ fetchError }}</div>
    </div>
    <!-- MODAL CONFIRM -->
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
  old_password: "",
  password: "",
  password_confirm: "",
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
