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
      <div>
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
      </div>
      <p class="text-error text-sm mt-5">Field with (*) is required.</p>
      <div class="h-10">{{ fetchError }}</div>
      <div class="modal-action">
        <label class="btn btn-error" @click="$emit('close')">Cancel</label>
        <label
          class="btn btn-primary"
          @click="
            $emit('saved');
            updateEdu();
            isLoading = true;
          "
          >Update</label
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
import Joi from "joi";
const emit = defineEmits(["close", "saved"]);
const props = defineProps({
  show: Boolean,
  data: Object,
});
const _show = ref(false);
const isLoading = ref(false);
const formData = ref({});
const EduStore = useEducationStore();
const errors = ref({});
const fetchError = ref("");
watchEffect(() => {
  _show.value = props.show;
  if (props.show) {
    isLoading.value = false;
  }
  if (props.data) {
    formData.value = {
      institutionName: props.data.institutionName,
      startYear: props.data.startYear,
      endYear: props.data.endYear,
      major: props.data.major,
      degree: props.data.degree,
    };
  }
});
const updateEdu = async () => {
  isLoading.value = true;
  try {
    // TAKE ID
    const id = props.data.id;
    if (!formData.value.major) formData.value.major = "-";
    if (!formData.value.degree) formData.value.degree = "-";
    // DELETE PROCESS
    await EduStore.update(id, formData.value);
    isLoading.value = false;

    // // // HIDE MODAL
    // showDeleteModal.value = false;

    // // // SUCCESS MODAL
    // successAlert.value = true;

    // // REFRESH DATA
    await EduStore.get();
  } catch (error) {
    isLoading.value = false;
    if (error instanceof Joi.ValidationError) {
      errors.value = joierror(error);
    } else {
      if (error.data) fetchError.value = error.data.message;
      else console.log(error); //code error
    }
  }
};
</script>
