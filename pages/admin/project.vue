<template>
  <div> ini halaman project </div>
  <div>Counter : {{ Counter.count }}</div>
  <button class="btn btn-accent" @click="Counter.add10">add 10</button>
</template>

<script setup>
// import {useCounterStore} from '../../stores/counterStore'
definePageMeta({
  layout: "admin",
});
const Counter = useCounterStore();
</script>
