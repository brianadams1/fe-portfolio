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
        <label class="btn btn-neutral" for="confirm"> Save </label>
        <div class="text-error text-sm pt-5 text-center">{{ fetchError }}</div>
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
const fetchError = ref("");
const formData = ref({
  name: AuthStore.user.name,
  email: AuthStore.user.email,
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
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      errors.value = joierror(error);
    } else {
      console.log("error for fetch");
      console.log(error);
      fetchError.value = error.data.message;
    }
  }
};
</script>
