<template>
  <input v-model="_show" type="checkbox" class="modal-toggle" />
  <div class="modal" role="dialog">
    <div class="modal-box">
      <form method="dialog">
        <label
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          @click="$emit('close')"
          >✕</label
        >
      </form>
      <h3 class="font-bold text-lg">Success</h3>
      <h3 class="font-semibold">Changes saved</h3>

      <div class="modal-action">
        <label @click="$emit('close')" class="btn">Close</label>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <label @click="$emit('close')"> </label>
    </form>
  </div>
</template>
<script setup>
defineEmits(["close"]);
const props = defineProps({
  show: Boolean,
});

const _show = ref(false);

watchEffect(() => {
  _show.value = props.show;
});
</script>
