<template>
  <div class="flex min-h-screen text-default" data-theme="dracula">
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
    </div>
    <!-- SIDE MENU TOGGLE BUTTON -->
    <div class="drawer-content fixed right-8 md:hidden z-10">
      <!-- Page content here -->
      <label
        @click="toggleDrawer = !toggleDrawer"
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
      @click="toggleDrawer = !toggleDrawer"
      type="checkbox"
      class="drawer-toggle"
    />

    <div class="drawer-side overflow-hidden">
      <label
        @click="toggleDrawer = !toggleDrawer"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <div class="menu p-14 w-80 min-h-full bg-base-200 text-base-content">
        <div class="px-4 text-2xl">Menu</div>
        <ul class="menu">
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
    hash: "#home",
    title: "Home",
    icon: resolveComponent("LucideHome"),
  },
  {
    path: "/",
    hash: "#about",
    title: "About",
    icon: resolveComponent("LucideUserRound"),
  },
  {
    path: "/",
    hash: "#blog",
    title: "Blog",
    icon: resolveComponent("LucideNewspaper"),
  },
  {
    path: "/",
    hash: "#experience",
    title: "Experience",
    icon: resolveComponent("LucideBriefcase"),
  },
  {
    path: "/",
    hash: "#education",
    title: "Education",
    icon: resolveComponent("LucideGraduation-Cap"),
  },
  {
    path: "/",
    hash: "#project",
    title: "Project",
    icon: resolveComponent("LucideLayoutPanelLeft"),
  },
  {
    path: "/",
    hash: "#skill",
    title: "Skill",
    icon: resolveComponent("LucideWrench"),
  },
];
</script>
