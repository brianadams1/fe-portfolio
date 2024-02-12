<template>
  <div> Nih Dashboard </div>
  <div>Counter : {{ Counter.count }}</div>
  <button class="btn btn-primary" @click="Counter.increment"
    >Add counter</button
  >
  <button class="btn btn-primary" @click="Counter.decrement"> - counter</button>
</template>
<script setup>
// import {useCounterStore} from '../../stores/counterStore'
definePageMeta({
  layout: "admin",
});

const Counter = useCounterStore();
</script>
