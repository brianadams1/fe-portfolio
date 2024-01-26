<template>
  <div class="grid grid-cols-10">
    <!-- PROFILE CARD -->
    <div
      class="col-span-10 md:col-span-5 lg:col-span-4 xl:col-span-3 min-h-screen grid"
    >
      <IndexProfilecard :profile="profile" />
    </div>

    <!-- SECTIONS -->
    <div
      class="col-span-10 md:col-span-5 lg:col-span-6 xl:col-span-7 p-6 lg:pr-20 xl:px-40"
    >
      <IndexHome />
      <IndexAbout />
      <IndexBlog :blog="blogs"/>
      <IndexExperience :experience="experience"/>
      <IndexEducation :educations="educations"/>
      <IndexProject :projects="projects"/>
      <IndexSkill :skills="skills"/>
    </div>
  </div>
</template>
<script setup>
const data = await $fetch("http://localhost:5000/portfolio");
const profile = data.data.profile;
console.log(profile)
const experience = data.data.experience;
const projects = data.data.projects;
const skills = data.data.skills
const educations = data.data.educations;
const blogs = data.data.blogs;
</script>

<style scoped></style>
