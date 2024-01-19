<template>
  <div class="grid grid-cols-10">
    <!-- PROFILE CARD -->
    <div
      class="col-span-10 md:col-span-5 lg:col-span-4 xl:col-span-3 min-h-screen grid"
    >
      <IndexProfilecard />
    </div>

    <!-- SECTIONS -->
    <div
      class="col-span-10 md:col-span-5 lg:col-span-6 xl:col-span-7 p-6 lg:pr-20 xl:px-40"
    >
      <IndexHome />
      <IndexAbout />
      <IndexBlog />
      <IndexExperience />
      <IndexEducation/>
      <IndexProject />
      <IndexSkill />
    </div>
  </div>
</template>
<!-- <script setup></script>

<style scoped></style> -->
