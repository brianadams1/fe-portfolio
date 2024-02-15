<template>
  <div
    class="w-screen h-screen max-h-screen max-w-screen overflow-hidden bg-white"
  >
    <div class="w-full h-full grid max-lg:grid-rows-10 lg:grid-cols-2">
      <div class="max-lg:row-span-4 flex flex-col justify-center items-center">
        <SvgProgrammer class="w-[120%]" />
      </div>
      <div
        class="font-poppins max-lg:row-span-6 bg-rose-100 flex flex-col gap-5 lg:gap-12 md:gap-8 items-center justify-center px-10 md:px-28 lg:px-20 xl:px-32"
      >
        <div class="xl:text-5xl lg:text-4xl md:text-6xl text-4xl">
          <div class="border-b-2 p-4 border-slate-500">
            {{ fullname }}
          </div>
        </div>
        <!-- input email -->
        <div class="w-full">
          <label for="" class="text-xl md:text-2xl"> Email </label>
          <input
            v-model="formData.email"
            type="email"
            placeholder="Email"
            class="input w-full bg-rose-200"
          />
        </div>
        <!-- input password -->
        <div class="w-full">
          <label for="" class="ext-xl md:text-2xl"> Password </label>
          <input
            v-model="formData.password"
            type="password"
            placeholder="Password"
            class="input w-full bg-rose-200"
          />
        </div>
        <button
          @click="AuthStore.login(formData)"
          class="btn border-0 text-xl md:text-2xl md:py-2 text-nowrap h-min bg-rose-200 px-10 md:px-20"
        >
          Login Now
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: false,
  middleware: ["profile", "auth"],
});

const { value: useProfile } = useState("profile");
const fullname = `${useProfile.firstName} ${useProfile.lastName}`;

const formData = ref({
  email: "",
  password: "",
});

const config = useRuntimeConfig();
const apiUri = config.public.apiUri;

// auth state
const AuthStore = useAuthStore();
</script>
