<template>
  <div>
    <div class="font-semibold mb-5 border-b-2 border-white/30">
      User Setting
    </div>

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
        <div
          class="text-error text-right text-sm pr-2 pt-2"
          v-if="errors.email"
        >
          {{ errors.email }}
        </div>
      </label>
      <label class="form-control w-full max-w-xs">
        <div class="label label-text pb-0"> Password </div>
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
        <div class="label label-text pb-0"> Confirm Password </div>
        <input
          v-model="formData.confirm_password"
          type="password"
          class="input input-bordered w-full max-w-xs"
          autocomplete="off"
        />
        <div
          class="text-error text-right text-sm pr-2 pt-2"
          v-if="errors.confirm_password"
        >
          {{ errors.confirm_password }}
        </div>
      </label>
      <div class="text-error text-sm pt-5">{{ fetchError }}</div>
      <div class="">
        <label class="btn btn-neutral" for="confirm"> Save </label>
      </div>
    </div>
    <!-- The button to open modal -->

    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="confirm" class="modal-toggle" />
    <div class="modal" role="dialog">
      <div class="modal-box">
        <form method="dialog">
          <label
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            for="confirm"
            >✕</label
          >
        </form>
        <h3 class="font-bold text-lg">Well...</h3>
        <p class="py-4">You sure to save these changes?</p>
        <div class="modal-action">
          <!-- <div v-if="isLoading">
            <SvgCat :size="30" class="animate-pulse"
          /></div> -->
          <label for="confirm" class="btn btn-error">Cancel</label>
          <label for="confirm" class="btn btn-primary" @click="handleUpdate"
            >Save</label
          >
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <label for="confirm"> </label>
      </form>
    </div>
  </div>
</template>

<script setup>
import Joi from "joi";

definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});
const AuthStore = useAuthStore();

const errors = ref({});
const formData = ref({
  name: AuthStore.user.name,
  email: AuthStore.user.email,
  password: "",
  confirm_password: "",
});
// auth state
const errorMessage = ref({});
const fetchError = ref("");
// const isLoading = ref(false);
const handleUpdate = async () => {
  // isLoading.value = true;
  try {
    // fetch login
    await AuthStore.updateUser(formData.value);
    formData.value.password = "";
    formData.value.confirm_password = "";
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      errorMessage.value = joierror(error);
      formData.value.password = "";
      formData.value.confirm_password = "";
    } else {
      fetchError.value = error.message;
      formData.value.password = "";
      formData.value.confirm_password = "";
    }
    // isLoading.value = false;
  }
};
</script>
