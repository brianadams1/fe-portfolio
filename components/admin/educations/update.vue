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
      <h3 class="font-bold text-lg">Update Education</h3>
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text"
            >Institution Name <span class="text-error">*</span></span
          >
        </div>
        <input
          type="text"
          v-model="formData.institutionName"
          class="input input-bordered w-full max-w-xs"
        />
      </label>
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text"
            >Start Year <span class="text-error">*</span></span
          >
        </div>
        <input
          type="text"
          v-model="formData.startYear"
          class="input input-bordered w-full max-w-xs"
        />
      </label>
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">End Year</span>
        </div>
        <input
          type="text"
          v-model="formData.endYear"
          class="input input-bordered w-full max-w-xs"
        />
      </label>
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Major</span>
        </div>
        <input
          type="text"
          v-model="formData.major"
          class="input input-bordered w-full max-w-xs"
        />
      </label>
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Degree</span>
        </div>
        <input
          type="text"
          v-model="formData.degree"
          class="input input-bordered w-full max-w-xs"
        />
      </label>
      <p class="text-error text-sm mt-5">Field with (*) is required.</p>
      <div class="modal-action">
        <label class="btn btn-error" @click="$emit('close')">Cancel</label>
        <label class="btn btn-primary" @click="updateEdu">Update</label>
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
const formData = ref({
  institutionName: props.data.institutionName,
  startYear: props.data.startYear,
  endYear: props.data.endYear,
  major: props.data.major,
  degree: props.data.degree,
});
const Edustore = useEducationStore();
const updateEdu = async () => {
  isLoading.value = true;

  emit("close");
  try {
    await Edustore.update(formData);
    emit("deleted");
    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
    console.log(error);
  }
};
</script>
