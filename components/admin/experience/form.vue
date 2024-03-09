<template>
  <input type="checkbox" class="modal-toggle" v-model="_show" />
  <div class="modal" role="dialog">
    <div class="modal-box">
      <form method="dialog">
        <label
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          @click="$emit('close')"
        >
          ✕
        </label>
      </form>
      <div class="h-10 flex mt-3 justify-between items-end">
        <h3 class="font-bold text-lg">
          {{ data ? "Update " + data.company : "Create experience" }}
        </h3>
      </div>
      <div>
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text">Company Name</span>
          </div>
          <input
            type="text"
            placeholder="Company Name"
            class="input input-bordered w-full max-w-xs"
            v-model="formData.company"
          />
        </label>
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text">Title</span>
          </div>
          <input
            type="text"
            placeholder="Title"
            class="input input-bordered w-full max-w-xs"
            v-model="formData.title"
          />
        </label>
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text"> Location</span>
          </div>
          <input
            type="text"
            placeholder="Location"
            class="input input-bordered w-full max-w-xs"
            v-model="formData.location"
          />
        </label>
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text">Description</span>
          </div>
          <textarea
            v-model="formData.description"
            rows="5"
            placeholder="Description"
            class="max-w-xs bg-base-100 textarea textarea-bordered"
          >
          </textarea>
        </label>

        <label class="form-control max-w-full">
          <div class="label label-text pb-3 items-end"> Start Date </div>
          <div class="flex">
            <DatePicker v-model="formData.startDate" color="gray">
              <template #default="{ togglePopover }">
                <button
                  @click="togglePopover"
                  class="btn btn-outline border-white/30 min-w-48"
                >
                  {{ dayjs(formData.startDate).format("DD MMMM YYYY") }}
                </button>
              </template>
            </DatePicker>
          </div>
        </label>
        <label class="form-control w-full">
          <div class="label label-text pb-3 items-end"> End Date </div>
          <div class="flex items-center gap-4">
            <DatePicker v-model="formData.endDate" color="gray">
              <template #default="{ togglePopover }">
                <button
                  @click="togglePopover"
                  class="btn btn-outline border-white/30 min-w-48"
                  :disabled="isPresent"
                >
                  {{
                    isPresent
                      ? " "
                      : dayjs(formData.endDate).format("DD MMMM YYYY")
                  }}
                </button>
              </template>
            </DatePicker>
            <input
              type="checkbox"
              v-model="isPresent"
              class="checkbox"
              @change="handlePresent"
            />
            Present
          </div>
        </label>
      </div>

      <div class="modal-action flex items-start text-xs">
        <div class="mx-auto w-[80%]">
          <Transition name="slide-fade" :duration="550" class="text-xs">
            <LazyrrorAlert v-if="fetchError">
              {{ fetchError }}
            </LazyrrorAlert>
          </Transition>
          <Transition name="slide-fade" :duration="550">
            <!-- ERROR ALERT -->
            <!-- ERROR FROM NON-FETCH -->
            <LazyAdminErrorAlert v-if="Object.keys(errors).length">
              <div class="flex flex-col">
                <div v-for="e in Object.keys(errors)">{{ errors[e] }}</div>
              </div>
            </LazyAdminErrorAlert>
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
          {{ data ? "Update" : "Create" }}
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
import dayjs from "dayjs";
import { DatePicker } from "v-calendar";

const emit = defineEmits(["close", "saved"]);
const props = defineProps({
  data: Object,
  show: Boolean,
});
const isLoading = ref(false);
const _show = ref(false);
const formData = ref({});
const isPresent = ref(false);

watchEffect(() => {
  _show.value = props.show;
  //reset form
  formData.value = {
    company: props.data ? props.data.company : "",
    title: props.data ? props.data.title : "",
    location: props.data ? props.data.location : "",
    description: props.data ? props.data.description : "",
    startDate: props.data ? new Date(props.data.startDate) : new Date(),
    endDate: props.data
      ? props.data.endDate != null
        ? new Date(props.data.endDate)
        : new Date()
      : new Date(),
  };
  isPresent.value = props.data ? props.data.endDate == null : false;
});
const errors = ref({});
const fetchError = ref("");

// handle save
const ExpStore = useExperienceStore();
const save = async () => {
  // reset error
  errors.value = {};
  fetchError.value = "";
  try {
    // show loading indicator
    isLoading.value = true;
    // return;
    if (!props.data) await ExpStore.create(formData.value);
    else await ExpStore.update(props.data.id, formData.value);
    // hide loading indicator
    isLoading.value = false;

    // save by emit
    emit("saved");
  } catch (error) {
    isLoading.value = false;
    if (error instanceof Joi.ValidationError) errors.value = joierror(error);
    else if (error.data) fetchError.value = error.data.message;
    else console.log(error); //code error
  }
};
const handlePresent = (e) => {
  isPresent.value = e.target.checked;
  if (isPresent.value) formData.value.endDate = "";
};
</script>
