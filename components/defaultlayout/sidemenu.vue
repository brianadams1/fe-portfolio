<template>
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
</template>

<script setup>
defineProps({
    menus: Array
})
</script>