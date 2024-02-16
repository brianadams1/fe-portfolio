<template>
  <div> Halaman profile</div>
  <div>Counter : {{ Counter.count }}</div>
  <div class="flex flex-wrap gap-4">
    <button class="btn btn-primary"> ini button dengan class primary </button>
    <button class="btn btn-primary-content">
      ini button dengan class primary-content
    </button>
    <button class="btn btn-secondary">
      ini button dengan class secondary
    </button>
    <button class="btn btn-secondary-content">
      ini button dengan class secondary-content
    </button>
    <button class="btn btn-accent"> ini button dengan class accent </button>
    <button class="btn btn-accent-content">
      ini button dengan class accent-content
    </button>
    <button class="btn btn-neutral"> ini button dengan class neutral </button>
    <button class="btn btn-neutral-content">
      ini button dengan class neutral-content
    </button>
    <button class="btn btn-base-100">ini button dengan class base-100</button>
    <button class="btn btn-base-200">ini button dengan class base-200</button>
    <button class="btn btn-base-300">ini button dengan class base-300</button>
    <button class="btn btn-base-content"
      >ini button dengan class base-content</button
    >
    <button class="btn btn-info">ini button dengan class info</button>
    <button class="btn btn-info-content"
      >ini button dengan class info-content</button
    >
    <button class="btn btn-success">ini button dengan class success</button>
    <button class="btn btn-warning">ini button dengan class warning</button>
    <button class="btn btn-error">ini button dengan class error</button>
    <button class="btn btn-primary">ini button dengan class primary</button>
  </div>
</template>

<script setup>
// import {useCounterStore} from '../../stores/counterStore'
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

const Counter = useCounterStore();
</script>
