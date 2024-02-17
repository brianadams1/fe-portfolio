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
      <div class="">
        <button class="btn btn-neutral mt-5" @click="handleUpdate">Update</button>
      </div>
    </div>
  </div>
</template>

<script setup>
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
const handleUpdate = () => {
  // modal confirm

  // validate

  // fetch data update
}
</script>
