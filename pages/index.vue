<template>
  <div class="flex min-h-screen">
    <div class="min-h-screen grow grid grid-cols-10">
      <div class="col-span-10 md:col-span-3 min-h-screen bg-indigo-100 grid">
        <div
          class="md:fixed border rounded-md border-slate-200 min-h-screen bg-slate-100"
        >
          ini isi
        </div>
      </div>
      <div class="col-span-10 md:col-span-7 bg-warning">
        <div class="bg-sky-200 min-h-screen">
          <div class="hamburger border rounded-full p-4">
            <LucideGanttChart :size="22" class="text-accent" />
          </div>
        </div>
        <div class="bg-sky-400 min-h-screen">scroll</div>
        <div class="bg-sky-600 min-h-screen">scroll</div>
        <div class="bg-sky-800 min-h-screen">scroll</div>
      </div>
    </div>
    <div class="bg-slate-100 min-h-screen w-32 flex-none max-md:hidden">
      <div class="fixed min-h-screen flex items-center">
        <div
          class="icons rounded-full border-2 border-slate-400 p-4 flex flex-col gap-6 text-center"
        >
          <div class="tooltip tooltip-left" data-tip="Home">
            <LucideHome :size="22" class="text-accent" />
          </div>
          <div class="tooltip tooltip-left" data-tip="Profile">
            <LucideUserRound :size="22" class="text-accent" />
          </div>
          <div class="tooltip tooltip-left" data-tip="Projects">
            <LucideFolder :size="22" class="text-accent" />
          </div>
          <div class="tooltip tooltip-left" data-tip="About">
            <LucideBarChartHorizontal :size="22" class="text-accent" />
          </div>
          <div class="tooltip tooltip-left" data-tip="Skills">
            <LucideWaypoints :size="22" class="text-accent" />
          </div>
          <div class="tooltip tooltip-left" data-tip="Portfolio">
            <LucideScrollText :size="22" class="text-accent" />
          </div>
          <div class="tooltip tooltip-left" data-tip="Testimonial">
            <LucideMessageSquareHeart :size="22" class="text-accent" />
          </div>
          <div class="tooltip tooltip-left" data-tip="Contact">
            <LucideSend :size="22" class="text-accent" />
          </div>
          <div class="tooltip tooltip-left" data-tip="Resume">
            <LucideLayoutPanelLeft :size="22" class="text-accent" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
