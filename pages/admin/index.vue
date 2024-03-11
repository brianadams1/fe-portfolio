<template>
  <div> Nih Dashboard </div>

  <!-- <template v-if="AuthStore.user"> -->
  <div> Name: {{ AuthStore.user.name }} </div>
  <div> Email: {{ AuthStore.user.email }} </div>
  <!-- </template> -->
</template>
<script setup>
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

const AuthStore = useAuthStore();
</script>
