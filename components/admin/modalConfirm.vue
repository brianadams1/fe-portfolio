<template>
  <input type="checkbox" class="modal-toggle" v-model="_show" />
  <div class="modal" role="dialog">
    <div class="modal-box">
      <form method="dialog">
        <label
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          @click="$emit('close')"
          >✕</label
        >
      </form>
      <h3 class="font-bold text-lg">Well...</h3>
      <p class="py-4">You sure to save these changes?</p>
      <div class="modal-action">
        <!-- <div v-if="isLoading">
            <SvgCat :size="30" class="animate-pulse"
            /></div> -->
        <label class="btn btn-error" @click="$emit('close')">Cancel</label>
        <label class="btn btn-primary" @click="$emit('saved')">Save</label>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <label @click="$emit('close')"> </label>
    </form>
  </div>
</template>

<script setup>
defineEmits(["close", "saved"]);
const props = defineProps({
  show: Boolean,
});
const _show = ref(false);
watchEffect(() => {
  _show.value = props.show;
});
</script>
