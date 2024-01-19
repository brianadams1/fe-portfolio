<template>
  <div class="flex min-h-screen text-default" data-theme="dracula">
    <!-- MAIN CONTENT -->
    <div class="min-h-screen grow">
      <slot></slot>
    </div>
    <!-- SIDE MENU -->
    <DefaultlayoutSidemenu/>
   
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
 <DefaultlayoutMenudrawer :toggleDrawer="toggleDrawer" :menus="menus"/>
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
