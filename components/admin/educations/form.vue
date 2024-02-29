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
        <h3 class="font-bold text-lg">
          {{
            props.data
              ? "Update " + props.data.institutionName
              : "Create education"
          }}
        </h3>
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
          <div class="flex items-center gap-5">
            <input
              type="text"
              class="input input-bordered w-40"
              v-model="formData.startYear"
            />
            <input
              type="checkbox"
              v-model="isChecked"
              class="checkbox"
              @change="handlePresent"
            />
            Present
          </div>
        </label>

        <!-- END YEAR -->
        <label class="form-control w-40">
          <div class="label">
            <span class="label-text">End Year </span>
          </div>
          <input
            type="text"
            class="input input-bordered w-full max-w-xs"
            v-model="formData.endYear"
            :disabled="isChecked"
          />
        </label>
        <p class="text-error text-sm my-3">Field with (*) cannot be empty</p>
      </div>
      <div class="modal-action flex items-start text-xs">
        <div class="mx-auto w-[80%]">
          <Transition name="slide-fade" :duration="550" class="text-xs">
            <AdminErrorAlert v-if="fetchError">
              {{ fetchError }}
            </AdminErrorAlert>
          </Transition>
          <Transition name="slide-fade" :duration="550">
            <!-- ERROR ALERT -->
            <!-- ERROR FROM NON-FETCH -->
            <AdminErrorAlert v-if="Object.keys(errors).length">
              <div class="flex flex-col">
                <div v-for="e in Object.keys(errors)">{{ errors[e] }}</div>
              </div>
            </AdminErrorAlert>
          </Transition>
        </div>
        <label class="btn btn-error" @click="$emit('close')">Cancel</label>
        <label
          class="btn btn-neutral"
          @click="
            save();
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
const emit = defineEmits(["close", "saved"]);
const props = defineProps({
  data: Object,
  show: Boolean,
  text_confirm: String,
});
const isLoading = ref(false);
const _show = ref(false);
const formData = ref({});
const isChecked = ref(false);

watchEffect(() => {
  _show.value = props.show;
  //reset form
  formData.value = {
    institutionName: props.data ? props.data.institutionName : "",
    major: props.data ? props.data.major : "",
    degree: props.data ? props.data.degree : "",
    startYear: props.data ? props.data.startYear : "",
    endYear: props.data ? props.data.endYear : "",
  };
  isChecked.value = props.data ? props.data.endYear == null : false;
});
const errors = ref({});
const fetchError = ref("");

// handle present
const handlePresent = (e) => {
  // take value, checked or not
  isChecked.value = e.target.checked;

  if (isChecked.value) formData.value.endYear = "";
};

// handle save
const EduStore = useEducationStore();
const save = async () => {
  // reset error
  errors.value = {};
  fetchError.value = "";
  try {
    if (!formData.value.endYear) formData.value.endYear = null;
    if (!formData.value.major) formData.value.major = "-";
    if (!formData.value.degree) formData.value.degree = "-";

    if (!props.data) {
      await EduStore.create(formData.value);
    } else {
      await EduStore.update(props.data.id, formData.value);
    }
    isLoading.value = false;
    // await EduStore.get();
    emit("saved");
  } catch (error) {
    isLoading.value = false;
    if (error instanceof Joi.ValidationError) errors.value = joierror(error);
    else if (error.data) fetchError.value = error.data.message;
    else console.log(error); //code error
  }
};
</script>
