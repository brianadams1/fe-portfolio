<template>
  <div
    class="w-screen h-screen max-h-screen max-w-screen overflow-hidden bg-white"
  >
    <div class="w-full h-full grid max-lg:grid-rows-10 lg:grid-cols-2">
      <div class="max-lg:row-span-4 flex flex-col justify-center items-center">
        <SvgProgrammer class="w-[120%]" />
      </div>
      <div
        class="font-poppins max-lg:row-span-6 bg-slate-700 text-white flex flex-col gap-5 lg:gap-12 md:gap-8 items-center justify-center px-10 md:px-28 lg:px-20 xl:px-32"
      >
        <div class="xl:text-5xl lg:text-4xl md:text-6xl text-4xl">
          <div class="border-b-2 p-4 border-slate-200">
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
            class="input w-full bg-sky-100"
          />
          <div
            class="text-error text-sm text-right mr-2"
            v-if="errorMessage.email"
          >
            {{ errorMessage.email }}
          </div>
        </div>
        <!-- input password -->
        <div class="w-full">
          <label for="" class="text-xl md:text-2xl"> Password </label>
          <input
            v-model="formData.password"
            type="password"
            placeholder="Password"
            class="input w-full bg-sky-100"
          />
          <div
            class="text-error text-sm text-right mr-2"
            v-if="errorMessage.password"
          >
            {{ errorMessage.password }}
          </div>
        </div>
        <button
          @click="handleLogin"
          class="btn border-0 text-xl md:text-2xl md:py-2 text-nowrap h-min bg-slate-600 px-10 md:px-20 text-white hover:text-black"
        >
          Login Now
        </button>
        <div class="text-error text-sm text-right mr-2">
          {{ fetchError }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Joi from "joi";

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
const errorMessage = ref({});
const fetchError = "";
const handleLogin = async () => {
  // reset error message
  errorMessage.value = {};

  try {
    // docopy from backend
    const loginValidation = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .label("Email"),
      password: Joi.string().min(6).max(100).required().label("Password"),
    });

    // throw jika error
    const data = Validate(loginValidation, formData.value);

    // fetch login
    await AuthStore.login(data);
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      errorMessage.value = joierror(error);
    } else {
      fetchError.value = error.data.message;
    }
  }
};
</script>
