<template>
  <div
    class="md:fixed min-h-screen flex items-center md:w-[25%] lg:w-[27%] xl:w-[28%] px-4"
  >
    <div class="flex w-full p-12 rounded-[35px] flex-col gap-6 border">
      <!-- title -->
      <div class="flex justify-between items-end mb-2">
        <div class="text-3xl font-medium">Drake</div>
        <div class="text-right text-base font-medium"
          >Framer Design <br />
          & Developer
        </div>
      </div>
      <!-- picture -->
      <div
        class="flex justify-center items-center aspect-square bg-neutral-200 rounded-2xl w-[80%] max-w-[350px] justify-items-center mx-auto"
      >
        <LucideUserRound :size="120" />
      </div>
      <!-- info -->
      <div class="text-center mt-5">
        <div class="text-2xl text-white">
          <p class="mb-2">hello@drake.design</p>
          <p>Based in Los Angeles, CA</p>
        </div>
        <p class="mt-8 text-sm text-white/50">&copy; 2022 Drake. All Rights Reserved</p>
      </div>
      <!-- social -->
      <div class="flex gap-3 mx-auto pb-2">
        <div v-for="s in socials" class="rounded-full p-4 border">
          <NuxtLink :to="{ path: s.path }">
            <component :is="s.icon" :size="18" class="text-default" />
          </NuxtLink>
        </div>
      </div>
      <!-- button -->
      <button 
        class="btn bg-green-200 flex items-center justify-center gap-3 rounded-full text-neutral"
      >
        <LucideMail :size="22" class="" />
        <p class=" font-medium">HIRE ME!</p>
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
