<template>
  <div class="drawer drawer-end" data-theme="sunset">
    <input
      v-model="show_drawer"
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

<script setup>
const props = defineProps({
  toggleDrawer: Boolean,
  menus: Array
});
const show_drawer = ref(props.toggleDrawer)

// use watchEffect, cek setiap perubahan variable
watchEffect(() => {
//   check perubahan dari props toggleDrawer
    show_drawer.value = props.toggleDrawer
})
</script>
