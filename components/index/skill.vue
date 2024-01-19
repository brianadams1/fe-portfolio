<template>
  <div class="min-h-screen py-12" id="skill">
    <div
      class="rounded-2xl border border-neutral text-xs w-fit px-4 py-2 flex gap-2 items-center uppercase"
    >
      <LucideWrench :size="13" />
      <div> Skill </div>
    </div>
    <div class="mt-10">
      <p class="text-4xl font-semibold mb-6">
        Every great <span class="text-info">Projects</span> begin with skills to <span class="text-accent">Learn</span>
      </p>
      <div v-for="m in 4" class="mb-10">
        <div class="font-semibold uppercase text-secondary mb-2"
          >SKILL CATEGORY</div
        >
        <div class="flex gap-6 flex-wrap">
          <div v-for="n in 10">
            <div
              class="aspect-square bg-neutral w-16 rounded-md flex items-center justify-center"
            >
              <LucideWrench :size="28" />
            </div>
            <div class="text-center"> Skill {{ n }} </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
