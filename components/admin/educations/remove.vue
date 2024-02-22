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
      <p>{{ props.data.institutionName }}</p>
      <div class="modal-action">
        <SvgCat :show="isLoading" :size="20" />
        <label class="btn btn-error" @click="$emit('close')">Cancel</label>
        <label class="btn btn-primary" @click="deleteEdu">Delete</label>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <label @click="$emit('close')"> </label>
    </form>
  </div>
</template>

<script setup>
const emit = defineEmits(["close", "deleted"]);
const props = defineProps({
  show: Boolean,
  data: Object,
});
const _show = ref(false);
const isLoading = ref(false);
watchEffect(() => {
  _show.value = props.show;
});
const Edustore = useEducationStore();
const deleteEdu = async () => {
  isLoading.value = true;

  emit("close");
  try {
    await Edustore.remove(props.data.id);
    emit("deleted");
    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
    console.log(error);
  }
};
</script>
