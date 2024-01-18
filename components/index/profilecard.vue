<template>
  <div
    class="md:fixed min-h-screen flex items-center md:w-[40%] lg:w-[27%] xl:w-[28%] px-4 py-2"
  >
    <div
      class="flex w-full max-lg:p-10 md:p-8 p-12 rounded-[35px] flex-col gap-6 border"
    >
      <!-- title -->
      <div class="flex justify-between items-end mb-2">
        <div class="xl:text-4xl md:text-xl text-4xl lg:text-2xl font-medium"
          >Drake</div
        >
        <div class="text-right text-xl md:text-sm xl:text-base font-medium"
          >Framer Design <br />
          & Developer
        </div>
      </div>
      <!-- picture -->
      <div
        class="flex justify-center items-center aspect-square bg-neutral-200 rounded-2xl w-full md:w-[90%] xl:w-[80%] max-w-[350px] justify-items-center mx-auto"
      >
        <LucideUserRound :size="120" />
      </div>
      <!-- info -->
      <div class="text-center mt-5">
        <div class="text-xl lg:text-xl xl:text-2xl text-white">
          <p class="mb-2">hello@drake.design</p>
          <p>Based in Los Angeles, CA</p>
        </div>
        <p class="mt-8 text-sm text-white/50"
          >&copy; 2022 Drake. All Rights Reserved</p
        >
      </div>
      <!-- social -->
      <div class="flex md:gap-1 lg:gap-2 mx-auto pb-2 gap-4 text-white/50">
        <div
          v-for="s in socials"
          class="rounded-full p-4 md:py-2 md:px-3 border border-white/25"
        >
          <NuxtLink :to="{ path: s.path }">
            <component :is="s.icon" class="text-default md:w-4" />
          </NuxtLink>
        </div>
      </div>
      <!-- button -->
      <button
        class="btn bg-green-200 flex items-center justify-center gap-3 rounded-full text-neutral"
      >
        <LucideMail :size="22" class="" />
        <p class="font-medium">HIRE ME!</p>
      </button>
    </div>
  </div>
</template>
<script setup>
const socials = [
  {
    path: "https://instagram.com",
    icon: resolveComponent("LucideInstagram"),
  },
  {
    path: "https://instagram.com",
    icon: resolveComponent("LucideTwitter"),
  },
  {
    path: "https://instagram.com",
    icon: resolveComponent("LucideGlobe-2"),
  },
  {
    path: "https://instagram.com",
    icon: resolveComponent("LucideGithub"),
  },
];
</script>
