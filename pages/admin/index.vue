<template>
  <div> Nih Dashboard </div>
  <div>Counter : {{ Counter.count }}</div>
  <div class="flex gap-5">
    <button class="btn bg-teal-900" @click="Counter.increment">
      Add counter
    </button>
    <button class="btn btn-primary" @click="Counter.decrement">
      - counter
    </button>
  </div>
  <!-- <template v-if="AuthStore.user"> -->
  <div> Name: {{ AuthStore.user.name }} </div>
  <div> Email: {{ AuthStore.user.email }} </div>
  <!-- </template> -->
</template>
<script setup>
// import {useCounterStore} from '../../stores/counterStore'
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

const Counter = useCounterStore();
const AuthStore = useAuthStore();
</script>
