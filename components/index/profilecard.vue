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
          >{{ profile.firstName }} {{ profile.lastName }}</div
        >
        <div class="text-right text-xl md:text-sm xl:text-base font-medium"
          >{{ profile.job }}
        </div>
      </div>
      <!-- picture -->
      <div
        v-if="profile.avatar"
        class="flex justify-center items-center aspect-square bg-neutral-200 rounded-2xl w-full md:w-[90%] xl:w-[80%] max-w-[350px] justify-items-center mx-auto"
      >
        <img :src="apiUri + profile.avatar" alt="" />
      </div>
      <div
        v-else
        class="flex justify-center items-center aspect-square bg-neutral-200 rounded-2xl w-full md:w-[90%] xl:w-[80%] max-w-[350px] justify-items-center mx-auto"
      >
        <LucideUserRound :size="20"/>
      </div>
      <!-- info -->
      <div class="text-center mt-5">
        <div class="text-2xl md:text-sm xl:text-lg text-white">
          <p class="mb-2">{{ profile.email }}</p>
          <p>{{ profile.city }}, {{ profile.country }}</p>
        </div>
        <p class="mt-8 text-sm text-white/50"
          >&copy; 2022 {{ profile.firstName }}{{ profile.lastName }} All Rights
          Reserved</p
        >
      </div>
      <!-- social -->
      <div
        class="flex flex-wrap md:gap-1 lg:gap-2 mx-auto pb-2 gap-2 text-white/50"
      >
        <div class="rounded-full p-4 md:py-2 md:px-3 border border-white/25">
          <NuxtLink
            class="text-default md:w-4 w-5"
            to="https://instagram.com"
            target="_blank"
          >
            <LucideInstagram :size="20" />
          </NuxtLink>
        </div>
        <div class="rounded-full p-4 md:py-2 md:px-3 border border-white/25">
          <NuxtLink
            class="text-default md:w-4 w-5"
            to="https://twitter.com"
            target="_blank"
          >
            <LucideTwitter :size="20" />
          </NuxtLink>
        </div>
        <div class="rounded-full p-4 md:py-2 md:px-3 border border-white/25">
          <NuxtLink
            class="text-default md:w-4 w-5"
            to="https://google.com"
            target="_blank"
          >
            <LucideGlobe2 :size="20" />
          </NuxtLink>
        </div>
        <div class="rounded-full p-4 md:py-2 md:px-3 border border-white/25">
          <NuxtLink
            class="text-default md:w-4 w-5"
            to="https://github.com"
            target="_blank"
          >
            <LucideGithub :size="20" />
          </NuxtLink>
        </div>
      </div>
      <!-- hire me button -->
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
defineProps({
  profile: Object,
});
const config = useRuntimeConfig()
const apiUri = config.public.apiUri
console.log(apiUri)
</script>
