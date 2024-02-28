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
      <slot ></slot>
      <div class="modal-action">
        <label class="btn btn-error" @click="$emit('close')">Cancel</label>
        <label
          class="btn btn-primary"
          @click="
            isLoading = true;
            $emit('saved');
          "
          >{{ text_confirm || "Update" }}</label
        >
        <div class="w-8">
          <SvgCat class="w-10" v-show="isLoading" />
        </div>
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
  text_confirm: String,
});
const isLoading = ref(false);
const _show = ref(false);
watchEffect(() => {
  _show.value = props.show;
  if (props.show) {
    isLoading.value = false;
  }
});
</script>
