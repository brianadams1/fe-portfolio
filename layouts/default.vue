<template>
  <div class="flex min-h-screen text-default" data-theme="business">
    <!-- MAIN CONTENT -->
    <div class="min-h-screen grow">
      <slot></slot>
    </div>
    <!-- SIDE MENU -->
    <div class="min-h-screen w-28 flex-none max-md:hidden">
      <div class="fixed min-h-screen flex items-center">
        <div
          class="icons rounded-full border-2 border-neutral p-5 flex flex-col gap-6 text-center"
        >
          <NuxtLink
            v-for="menu in menus"
            :to="{ path: menu.path, hash: menu.hash }"
            class="tooltip tooltip-left cursor-pointer"
            :data-tip="menu.title"
          >
            <component
              :is="menu.icon"
              :size="18"
              class="text-white hover:text-accent"
            />
          </NuxtLink>
        </div>
      </div>
      <!-- SIDE MENU TOGGLE BUTTON -->
    </div>
    <div class="drawer-content fixed right-8 md:hidden z-10">
      <!-- Page content here -->
      <label
        for="my-drawer-4"
        class="drawer-button btn border-neutral btn-circle mt-10 btn-outline"
      >
        <LucideMenu :size="22" class="" />
      </label>
    </div>
  </div>
  <!-- MOBILE MENU DRAWER -->
  <div class="drawer drawer-end" data-theme="sunset">
    <input
      v-model="toggleDrawer"
      id="my-drawer-4"
      type="checkbox"
      class="drawer-toggle"
    />

    <div class="drawer-side overflow-hidden">
      <label
        for="my-drawer-4"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <div class="menu p-14 w-80 min-h-full bg-base-200 text-base-content">
        <div class="px-4 text-2xl">Menu</div>
        <ul class="menu">
          <!-- Sidebar content here -->
          <li v-for="menu in menus" class="my-2"
            ><NuxtLink
              class="flex gap-2 items-start hover:text-accent"
              @click="toggleDrawer = !toggleDrawer"
              :to="{ path: menu.path, hash: menu.hash }"
            >
              <component :is="menu.icon" :size="18" class="text-accent" />
              {{ menu.title }}
            </NuxtLink></li
          >
        </ul>
        <div class="px-4 text-2xl py-2"> Social </div>
        <div class="menu flex-row gap-4">
          <a href="https://instagram.com" target="_blank">
            <LucideInstagram :size="16" class="text-accent" />
          </a>
          <a href="https://twitter.com" target="_blank">
            <LucideTwitter :size="16" class="text-accent" />
          </a>
          <a href="https://google.com" target="_blank">
            <LucideGlobe-2 :size="16" class="text-accent" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
html {
  scroll-behavior: smooth;
}
</style>
<script setup>
// reactive boolean
// toggle for open/close drawer
const toggleDrawer = ref(false);

const menus = [
  {
    path: "/",
    hash: "",
    title: "Home",
    icon: resolveComponent("LucideHome"),
  },
  {
    path: "/",
    hash: "#profile",
    title: "Profile",
    icon: resolveComponent("LucideUserRound"),
  },
  {
    path: "/",
    hash: "#projects",
    title: "Projects",
    icon: resolveComponent("LucideFolder"),
  },
  {
    path: "/",
    hash: "#about",
    title: "About",
    icon: resolveComponent("LucideBarChartHorizontal"),
  },
  {
    path: "/",
    hash: "#skills",
    title: "Skills",
    icon: resolveComponent("LucideWaypoints"),
  },
  {
    path: "/",
    hash: "#portfolio",
    title: "Porfolio",
    icon: resolveComponent("LucideScrollText"),
  },
  {
    path: "/",
    hash: "#testimonial",
    title: "Testimonial",
    icon: resolveComponent("LucideMessageSquareHeart"),
  },
  {
    path: "/",
    hash: "#contact",
    title: "Contact",
    icon: resolveComponent("LucideSend"),
  },
  {
    path: "/",
    hash: "#resume",
    title: "Resume",
    icon: resolveComponent("LucideLayoutPanelLeft"),
  },
];
</script>
