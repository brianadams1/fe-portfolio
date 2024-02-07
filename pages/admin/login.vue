<template>
  <div
    class="w-screen h-screen max-h-screen max-w-screen overflow-hidden bg-white"
  >
    <div class="w-full h-full grid max-lg:grid-rows-10 lg:grid-cols-2">
      <div class="max-lg:row-span-4 flex flex-col justify-center items-center">
        <SvgProgrammer class="w-[120%]" />
      </div>
      <div
        class="max-lg:row-span-6 bg-rose-100 flex flex-col gap-5 lg:gap-12 md:gap-8 items-center justify-center px-10 md:px-28 lg:px-20 xl:px-32"
      >
        <div class="xl:text-5xl lg:text-4xl md:text-6xl text-4xl font-bunge">{{
          fullname
        }}</div>
        <!-- input email -->
        <div class="w-full font-archy t">
          <label for="" class="text-xl md:text-2xl">Email</label>
          <input
            v-model="formData.email"
            type="email"
            placeholder="Email"
            class="input w-full bg-rose-200"
          />
        </div>
        <!-- input password -->
        <div class="w-full font-archy t">
          <label for="" class="ext-xl md:text-2xl">Password</label>
          <input
            v-model="formData.password"
            type="password"
            placeholder="Password"
            class="input w-full bg-rose-200"
          />
        </div>
        <button
          @click="doLogin"
          class="font-baloo btn border-0 text-xl md:text-2xl md:py-2 text-nowrap h-min bg-rose-200 px-10 md:px-20"
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
  middleware: ["profile"],
});

const { value: useProfile } = useState("profile");
const fullname = `${useProfile.firstName} ${useProfile.lastName}`;

const formData = ref({
  email: "",
  password: "",
});
const config = useRuntimeConfig();
const apiUri = config.public.apiUri;
const doLogin = async () => {
  // convert data to json
  const data = JSON.stringify(formData.value);

  await $fetch(apiUri + "/login", {
    method: "POST",
    body: data,
    headers: { 'Content-Type' : 'application/json'},
    credentials: 'include'
  });
  // REDIRECT TO HOME
  navigateTo('/')
};
</script>
