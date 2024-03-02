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
      <div
        class="h-10 flex mt-3 justify-between items-end border-b border-white/30"
      >
        <h3 class="font-bold text-lg">
          {{ data ? "Update " + data.title : "Create new Skill" }}
        </h3>
      </div>
      <div>
        <!-- INSTITUTION NAME -->
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text"> Skill title </span>
          </div>
          <input
            type="text"
            placeholder="Title"
            class="input input-bordered w-full bg-neutral"
            v-model="formData.title"
          />
        </label>
        <!-- MAJOR -->
        <label class="form-control w-full">
          <div class="label flex flex-col items-start">
            <span class="label-text mb-2"> Skill Category</span>
            <input
              type="text"
              placeholder="Category"
              class="input input-bordered w-full bg-neutral uppercase"
              v-model="formData.category"
            />
          </div>
          <div class="grid grid-cols-2">
            <div v-for="cat in categories" class="text-white bg-dark">
              {{ cat.title }}</div
            >
          </div>
          <!-- CATEGORY SELECTOR -->
          <label class="mt-2 text-sm mb-2">Select Category</label>
          <div class="flex flex-wrap gap-3 mt-2">
            <button
              v-for="cat in SkillStore.categories"
              class="btn btn-xs w-min text-nowrap"
              @click="formData.category = cat.title"
            >
              {{ cat.title }}
            </button>
          </div>
          <!-- <select
            @change="(e) => (formData.category = e.target.value)"
            class="select select-bordered w-full"
          >
            <option v-for="cat in SkillStore.categories" :value="cat.title">
              {{ cat.title }}
            </option>
          </select> -->
        </label>

        <!-- SVG -->
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text"> SVG </span>
          </div>
          <div
            v-html="formData.svg"
            class="rounded-full p-0 h-32 w-32 max-h-32 max-w-32 bg-white mx-auto my-5 text-xs border-box"
          ></div>
          <textarea
            rows="5"
            class="textarea textarea-bordered w-full bg-neutral"
            v-model="formData.svg"
          >
          </textarea>
        </label>
      </div>
      <div class="modal-action flex items-start">
        <div class="mx-auto w-[80%]">
          <Transition name="slide-fade" :duration="550" class="text-xs">
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
const emit = defineEmits(["close", "saved"]);
const props = defineProps({
  data: Object,
  show: Boolean,
});

const _show = ref(false);
const isLoading = ref(false);
const formData = ref({
  svg: "",
  title: "",
  category: "",
});
watchEffect(() => {
  _show.value = props.show;
  formData.value = {
    svg: props.data ? props.data.svg : "",
    title: props.data ? props.data.title : "",
    category: props.data ? props.data.category.title : "",
  };
  //reset form
});

const categories = ref([]);

const errors = ref({});
const fetchError = ref("");
// handle save
const SkillStore = useSkillStore();
const save = async () => {
  // reset error
  errors.value = {};
  fetchError.value = "";
  try {
    // show loading indicator
    isLoading.value = true;
    if (!props.data) await SkillStore.create(formData.value);
    else await SkillStore.update(props.data.id, formData.value);
    // hide loading indicator
    isLoading.value = false;
    emit("saved");
    await SkillStore.get();
    formData.value = {
      svg: "",
      title: "",
      category: "",
    };
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
