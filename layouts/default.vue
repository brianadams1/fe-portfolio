<template>
  <div class="flex min-h-screen text-default" data-theme="sunset">
    <!-- MAIN CONTENT -->
    <div class="min-h-screen grow grid grid-cols-10">
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
    <div class="drawer-content fixed right-8 md:hidden">
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
          <li v-for="menu in menus"
            ><NuxtLink
              class="flex gap items-start hover:text-accent"
              @click="toggleDrawer = !toggleDrawer"
              :to="{ path: menu.path, hash: menu.hash }"
            >
              <component :is="menu.icon" :size="18" class="text-accent" />
              {{ menu.title }}
            </NuxtLink></li
          >
          <!-- <li
            ><NuxtLink
              class="flex gap items-start hover:text-accent"
              @click="toggleDrawer = !toggleDrawer"
              :to="{ path: '/', hash: '#profile' }"
            >
              <LucideUserRound :size="18" class="text-accent" />
              Profile
            </NuxtLink></li
          >
          <li
            ><NuxtLink
              class="flex gap items-start hover:text-accent"
              @click="toggleDrawer = !toggleDrawer"
              :to="{ path: '/', hash: '#projects' }"
            >
              <LucideFolder :size="18" class="text-accent" />
              Projects
            </NuxtLink></li
          >
          <li
            ><NuxtLink
              class="flex gap items-start hover:text-accent"
              @click="toggleDrawer = !toggleDrawer"
              :to="{ path: '/', hash: '#about' }"
            >
              <LucideBarChartHorizontal :size="18" class="text-accent" />

              About
            </NuxtLink></li
          >
          <li
            ><NuxtLink
              class="flex gap items-start hover:text-accent"
              @click="toggleDrawer = !toggleDrawer"
              :to="{ path: '/', hash: '#skills' }"
            >
              <LucideWaypoints :size="18" class="text-accent" />

              Skills
            </NuxtLink></li
          >
          <li
            ><NuxtLink
              class="flex gap items-start hover:text-accent"
              @click="toggleDrawer = !toggleDrawer"
              :to="{ path: '/', hash: '#portfolio' }"
            >
              <LucideScrollText :size="18" class="text-accent" />

              Portfolio
            </NuxtLink></li
          >
          <li
            ><NuxtLink
              class="flex gap items-start hover:text-accent"
              @click="toggleDrawer = !toggleDrawer"
              :to="{ path: '/', hash: '#testimonial' }"
            >
              <LucideMessageSquareHeart :size="18" class="text-accent" />
              Testimonial
            </NuxtLink></li
          >
          <li
            ><NuxtLink
              class="flex gap items-start hover:text-accent"
              @click="toggleDrawer = !toggleDrawer"
              :to="{ path: '/', hash: '#contact' }"
            >
              <LucideSend :size="18" class="text-accent" />

              Contact
            </NuxtLink></li
          >
          <li
            ><NuxtLink
              class="flex gap items-start hover:text-accent"
              @click="toggleDrawer = !toggleDrawer"
              :to="{ path: '/', hash: '#resume' }"
            >
              <LucideLayoutPanelLeft :size="18" class="text-accent" />
              Resume
            </NuxtLink></li
          > -->
        </ul>
        <div class="px-4 text-2xl py-2"> Social </div>
        <div class="menu flex-row gap-4">
          <NuxtLink :to="{ path: '/', hash: '#' }">
            <LucideInstagram :size="16" class="text-accent" />
          </NuxtLink>
          <NuxtLink :to="{ path: '/', hash: '#' }">
            <LucideTwitter :size="16" class="text-accent" />
          </NuxtLink>
          <NuxtLink :to="{ path: '/', hash: '#' }">
            <LucideGlobe-2 :size="16" class="text-accent" />
          </NuxtLink>
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
