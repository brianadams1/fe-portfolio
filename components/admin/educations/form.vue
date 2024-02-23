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
      <div class="h-10 flex mt-3 justify-between items-end">
        <h3 class="font-bold text-lg">Create new education</h3>
      </div>
      <div>
        <!-- INSTITUTION NAME -->
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text"
              >Institution Name <span class="text-error">*</span></span
            >
          </div>
          <input
            type="text"
            class="input input-bordered w-full max-w-xs"
            v-model="formData.institutionName"
          />
        </label>
        <!-- MAJOR -->
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text">Major</span>
          </div>
          <input
            type="text"
            class="input input-bordered w-full max-w-xs"
            v-model="formData.major"
          />
        </label>
        <!-- DEGREE -->
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text">Degree </span>
          </div>
          <input
            type="text"
            class="input input-bordered w-full max-w-xs"
            v-model="formData.degree"
          />
        </label>
        <!-- START YEAR -->
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text"
              >Start Year <span class="text-error">*</span></span
            >
          </div>
          <input
            type="text"
            class="input input-bordered w-full max-w-xs"
            v-model="formData.startYear"
          />
        </label>
        <!-- END YEAR -->
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text">End Year </span>
          </div>
          <input
            type="text"
            class="input input-bordered w-full max-w-xs"
            v-model="formData.endYear"
          />
        </label>
        <p class="text-error text-sm my-3">Field with (*) cannot be empty</p>
      </div>
      <div class="modal-action flex items-start">
        <div class="mx-auto w-[80%]">
          <!-- SUCCESS ALERT -->

          <Transition name="slide-fade" :duration="550">
            <AdminSuccessAlert v-if="successAlert" class="text-xs" />
          </Transition>
          <Transition name="slide-fade" :duration="550">
            <!-- ERROR ALERT -->
            <!-- ERROR FROM NON-FETCH -->
            <AdminErrorAlert v-if="Object.keys(errors).length" class="text-xs">
              <div class="flex flex-col">
                <div v-for="e in Object.keys(errors)">{{ errors[e] }}</div>
              </div>
            </AdminErrorAlert>
          </Transition>
          <Transition name="slide-fade" :duration="550" class="text-xs">
            <!-- ERROR FROM FETCH -->

            <AdminErrorAlert v-if="fetchError">
              {{ fetchError }}
            </AdminErrorAlert>
          </Transition>
        </div>
        <label class="btn btn-error" @click="$emit('close')">Cancel</label>
        <label
          class="btn btn-neutral"
          @click="
            save();
            $emit('saved');
            isLoading = true;
          "
        >
          {{ text_confirm || "Save" }}
          <SvgCat class="w-10" v-show="isLoading" />
        </label>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <label @click="$emit('close')"> </label>
    </form>
  </div>
</template>

<script setup>
import Joi from "joi";
defineEmits(["close", "saved"]);
const props = defineProps({
  show: Boolean,
  text_confirm: String,
});
const isLoading = ref(false);
const _show = ref(false);
const formData = ref({
  institutionName: "",
  major: "",
  degree: "",
  startYear: "",
  endYear: "",
});
watchEffect(() => {
  _show.value = props.show;
  //reset form
  formData.value = {
    institutionName: "",
    major: "",
    degree: "",
    startYear: "",
    endYear: "",
  };
});
const EduStore = useEducationStore();
const errors = ref({});
const fetchError = ref("");
const successAlert = ref(false);
// handle save
const save = async () => {
  // reset error
  errors.value = {};
  fetchError.value = "";
  try {
    if (!formData.value.endYear) formData.value.endYear = null;
    await EduStore.create(formData.value);
    isLoading.value = false;
    await EduStore.get()
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
