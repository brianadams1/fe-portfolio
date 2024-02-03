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
      <IndexAbout :profile="profile" />
      <IndexBlog :blogs="blogs" />
      <IndexExperience :experience="experience" />
      <IndexEducation :educations="educations" />
      <IndexProject :projects="projects" :skills="skills" />
      <IndexSkill :skills="skills" />
    </div>
  </div>
</template>
<script setup>
// CSR(CLIENT SIDE RENDERING) FETCH
// changed to SSR

const getPortfolio = async () => {
  try {
    return await $fetch("/api/portfolio")
  } catch (error) {
    throw createError(error)
  }
}

const {profile, projects, skills,experience, educations, blogs } = await getPortfolio();

</script>

<style scoped></style>
