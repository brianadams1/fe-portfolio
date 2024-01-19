<template>
  <div class="min-h-screen py-12 flex flex-col" id="about">
    <div
      class="rounded-2xl border border-neutral text-xs w-fit px-4 py-2 flex gap-2 items-center uppercase"
    >
      <LucideBarChartHorizontal :size="16" />

      About
    </div>
    <div class="flex flex-col gap-12 mt-10 grow">
      <p class="lg:text-6xl xl:text-7xl leading-tight">
        Say Hi from <span class="text-info">Drake</span>, Webflow Designer and
        Developer
      </p>
      <p class="font-light"
        >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam illo
        fuga natus ab ut similique neque veritatis harum, saepe fugit eius qui
        nam ex quam magnam doloribus praesentium doloremque esse quis ea.
        Obcaecati dolorum magni fugit voluptatem, nisi labore beatae nobis
        impedit inventore, ratione mollitia exercitationem possimus quos quam
        hic!</p
      >
      <div class="flex gap-20 grow items-end pb-10">
        <div>
          <div class="text-accent text-4xl font-semibold">10+</div>
          <div class="uppercase"
            >years of <br />
            experience</div
          >
        </div>
        <div>
          <div class="text-accent text-4xl font-semibold">10+</div>
          <div class="uppercase"
            >projects <br />
            completed</div
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup></script>
