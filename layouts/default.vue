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
          <NuxtLink to="/" class="tooltip tooltip-left cursor-pointer" data-tip="Home">
            <LucideHome :size="18" class="text-white hover:text-accent" />
          </NuxtLink>
          <NuxtLink :to="{path: '/', hash: '#profile'}" class="tooltip tooltip-left cursor-pointer" data-tip="Profile">
            <LucideUserRound :size="18" class="text-white hover:text-accent" />
          </NuxtLink>
          <NuxtLink :to="{path: '/', hash: '#projects'}" class="tooltip tooltip-left cursor-pointer" data-tip="Projects">
            <LucideFolder :size="18" class="text-white hover:text-accent" />
          </NuxtLink>
          <NuxtLink :to="{path: '/', hash: '#about'}" class="tooltip tooltip-left cursor-pointer" data-tip="About">
            <LucideBarChartHorizontal
              :size="18"
              class="text-white hover:text-accent"
            />
          </NuxtLink>
          <NuxtLink :to="{path: '/', hash: '#skills'}" class="tooltip tooltip-left cursor-pointer" data-tip="Skills">
            <LucideWaypoints :size="18" class="text-white hover:text-accent" />
          </NuxtLink>
          <NuxtLink :to="{path: '/', hash: '#portfolio'}" class="tooltip tooltip-left cursor-pointer" data-tip="Portfolio">
            <LucideScrollText :size="18" class="text-white hover:text-accent" />
          </NuxtLink>
          <NuxtLink :to="{path: '/', hash: '#testimonial'}"
            class="tooltip tooltip-left cursor-pointer"
            data-tip="Testimonial"
          >
            <LucideMessageSquareHeart
              :size="18"
              class="text-white hover:text-accent"
            />
          </NuxtLink>
          <NuxtLink :to="{path: '/', hash: '#contact'}" class="tooltip tooltip-left cursor-pointer" data-tip="Contact">
            <LucideSend :size="18" class="text-white hover:text-accent" />
          </NuxtLink>
          <NuxtLink :to="{path: '/', hash: '#resume'}" class="tooltip tooltip-left cursor-pointer" data-tip="Resume">
            <LucideLayoutPanelLeft
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
    <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />

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
          <li
            ><NuxtLink class="flex gap items-start hover:text-accent" to="/">
              <LucideHome :size="18" class="text-accent" />
              Home
            </NuxtLink></li
          >
          <li
            ><NuxtLink class="flex gap items-start hover:text-accent" :to="{path: '/', hash: '#profile'}">
              <LucideUserRound :size="18" class="text-accent" />
              Profile
            </NuxtLink></li
          >
          <li
            ><NuxtLink class="flex gap items-start hover:text-accent" :to="{path: '/', hash: '#projects'}">
              <LucideFolder :size="18" class="text-accent" />
              Projects
            </NuxtLink></li
          >
          <li
            ><NuxtLink class="flex gap items-start hover:text-accent" :to="{path: '/', hash: '#about'}">
              <LucideBarChartHorizontal :size="18" class="text-accent" />

              About
            </NuxtLink></li
          >
          <li
            ><NuxtLink class="flex gap items-start hover:text-accent" :to="{path: '/', hash: '#skills'}">
              <LucideWaypoints :size="18" class="text-accent" />

              Skills
            </NuxtLink></li
          >
          <li
            ><NuxtLink class="flex gap items-start hover:text-accent" :to="{path: '/', hash: '#portfolio'}">
              <LucideScrollText :size="18" class="text-accent" />

              Portfolio
            </NuxtLink></li
          >
          <li
            ><NuxtLink class="flex gap items-start hover:text-accent" :to="{path: '/', hash: '#testimonial'}">
              <LucideMessageSquareHeart :size="18" class="text-accent" />
              Testimonial
            </NuxtLink></li
          >
          <li
            ><NuxtLink class="flex gap items-start hover:text-accent" :to="{path: '/', hash: '#contact'}">
              <LucideSend :size="18" class="text-accent" />

              Contact
            </NuxtLink></li
          >
          <li
            ><NuxtLink class="flex gap items-start hover:text-accent" :to="{path: '/', hash: '#resume'}">
              <LucideLayoutPanelLeft :size="18" class="text-accent" />
              Resume
            </NuxtLink></li
          >
        </ul>
        <div class="px-4 text-2xl py-2"> Social </div>
        <div class="menu flex-row gap-4">
          <NuxtLink :to="{path: '/', hash: '#'}">
            <LucideInstagram :size="16" class="text-accent" />
          </NuxtLink>
          <NuxtLink :to="{path: '/', hash: '#'}">
            <LucideTwitter :size="16" class="text-accent" />
          </NuxtLink>
          <NuxtLink :to="{path: '/', hash: '#'}">
            <LucideGlobe-2 :size="16" class="text-accent" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
html{
scroll-behavior: smooth;
}
</style>