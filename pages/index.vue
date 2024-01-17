<template>
  <div class="flex min-h-screen text-default" data-theme="sunset">
    <!-- MAIN CONTENT -->
    <div class="min-h-screen grow grid grid-cols-10">
      <!-- PROFILE CARD -->
      <div class="col-span-10 md:col-span-3 min-h-screen grid">
        <div class="md:fixed min-h-screen"> ini isi </div>
      </div>

      <!-- SECTIONS -->
      <div class="col-span-10 md:col-span-7">
        <div class="min-h-screen"> </div>
        <div class="min-h-screen">scroll</div>
        <div class="min-h-screen">scroll</div>
        <div class="min-h-screen">scroll</div>
      </div>
    </div>
    <!-- SIDE MENU -->
    <div class="min-h-screen w-28 flex-none max-md:hidden">
      <div class="fixed min-h-screen flex items-center">
        <div
          class="icons rounded-full border-2 border-neutral p-5 flex flex-col gap-6 text-center"
        >
          <div class="tooltip tooltip-left cursor-pointer" data-tip="Home">
            <LucideHome :size="18" class="text-white hover:text-accent" />
          </div>
          <div class="tooltip tooltip-left cursor-pointer" data-tip="Profile">
            <LucideUserRound :size="18" class="text-white hover:text-accent" />
          </div>
          <div class="tooltip tooltip-left cursor-pointer" data-tip="Projects">
            <LucideFolder :size="18" class="text-white hover:text-accent" />
          </div>
          <div class="tooltip tooltip-left cursor-pointer" data-tip="About">
            <LucideBarChartHorizontal
              :size="18"
              class="text-white hover:text-accent"
            />
          </div>
          <div class="tooltip tooltip-left cursor-pointer" data-tip="Skills">
            <LucideWaypoints :size="18" class="text-white hover:text-accent" />
          </div>
          <div class="tooltip tooltip-left cursor-pointer" data-tip="Portfolio">
            <LucideScrollText :size="18" class="text-white hover:text-accent" />
          </div>
          <div
            class="tooltip tooltip-left cursor-pointer"
            data-tip="Testimonial"
          >
            <LucideMessageSquareHeart
              :size="18"
              class="text-white hover:text-accent"
            />
          </div>
          <div class="tooltip tooltip-left cursor-pointer" data-tip="Contact">
            <LucideSend :size="18" class="text-white hover:text-accent" />
          </div>
          <div class="tooltip tooltip-left cursor-pointer" data-tip="Resume">
            <LucideLayoutPanelLeft
              :size="18"
              class="text-white hover:text-accent"
            />
          </div>
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
            ><a class="flex gap items-start hover:text-accent" href="#">
              <LucideHome :size="18" class="text-accent" />
              Home
            </a></li
          >
          <li
            ><a class="flex gap items-start hover:text-accent" href="#">
              <LucideUserRound :size="18" class="text-accent" />
              Profile
            </a></li
          >
          <li
            ><a class="flex gap items-start hover:text-accent" href="#">
              <LucideFolder :size="18" class="text-accent" />
              Projects
            </a></li
          >
          <li
            ><a class="flex gap items-start hover:text-accent" href="#">
              <LucideBarChartHorizontal :size="18" class="text-accent" />

              About
            </a></li
          >
          <li
            ><a class="flex gap items-start hover:text-accent" href="#">
              <LucideWaypoints :size="18" class="text-accent" />

              Skills
            </a></li
          >
          <li
            ><a class="flex gap items-start hover:text-accent" href="#">
              <LucideScrollText :size="18" class="text-accent" />

              Portfolio
            </a></li
          >
          <li
            ><a class="flex gap items-start hover:text-accent" href="#">
              <LucideMessageSquareHeart :size="18" class="text-accent" />
              Testimonial
            </a></li
          >
          <li
            ><a class="flex gap items-start hover:text-accent" href="#">
              <LucideSend :size="18" class="text-accent" />

              Contact
            </a></li
          >
          <li
            ><a class="flex gap items-start hover:text-accent" href="#">
              <LucideLayoutPanelLeft :size="18" class="text-accent" />
              Resume
            </a></li
          >
        </ul>
        <div class="px-4 text-2xl py-2"> Social </div>
        <div class="menu flex-row gap-4">
          <a href="#">
            <LucideInstagram :size="16" class="text-accent" />
          </a>
          <a href="#">
            <LucideTwitter :size="16" class="text-accent" />
          </a>
          <a href="#">
            <LucideGlobe-2 :size="16" class="text-accent" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
