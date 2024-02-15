<template>
  <div> Halaman profile</div>
  <div>Counter : {{ Counter.count }}</div>

</template>

<script setup>
// import {useCounterStore} from '../../stores/counterStore'
definePageMeta({
  layout: "admin",
  middleware: ['auth']
});

const Counter = useCounterStore();

</script>
