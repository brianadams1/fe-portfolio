<template>
    <div> ini halaman experience </div>
    <div>Counter : {{ Counter.count }}</div>
    <button class="btn btn-accent" @click="Counter.add10"> add 10 </button>
  </template>
  
  <script setup>
  // import {useCounterStore} from '../../stores/counterStore'
  definePageMeta({
    layout: "admin",
    middleware: ["auth"],
  });
  const Counter = useCounterStore();
  </script>