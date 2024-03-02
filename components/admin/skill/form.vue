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
            <span class="label-text"> Skill </span>
            <input
              type="text"
              placeholder="Category"
              class="input input-bordered w-full bg-neutral"
              v-model="formData.category"
            />
          </div>
          <div class="grid grid-cols-2">
            <div v-for="cat in categories" class="text-white bg-dark">
              {{ cat.title }}</div
            >
          </div>
        </label>
        <!-- v-if="svgShow" -->
        <div
          v-html="formData.svg"
          class="rounded-2xl p-2 h-20 w-20 max-h-20 max-w-20 bg-white mx-auto my-5 text-xs border-box"
        ></div>
        <!-- <div
          v-if="svgLoading"
          class="rounded-2xl p-2 h-20 w-20 max-h-20 max-w-20 bg-white mx-auto my-5 text-xs border-box flex flex-col justify-center items-center"
        >
          <SvgCat class="w-12" />
          <div class="text-black text-xs"> Load SVG... </div>
        </div> -->
        <!-- DEGREE -->
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">
              Skill SVG (Base height and width = 64, or just remove it.)
            </span>
          </div>
          <textarea rows="10" class="w-full bg-neutral" v-model="formData.svg">
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

const isLoading = ref(false);
const _show = ref(false);
const formData = ref({
  svg: "",
  title: "",
  category: "",
});
watchEffect(() => {
  _show.value = props.show;
  formData.value = {};
  //reset form
});

const message = ref("");
const checkedSkills = ref([]);

const categories = ref([]);
const SkillStore = useSkillStore();

const errors = ref({});
const fetchError = ref("");
// handle save
const save = async () => {
  // reset error
  errors.value = {};
  fetchError.value = "";
  try {
    // if (!formData.value.endYear) formData.value.endYear = null;
    await SkillStore.create(formData.value);
    emit("saved");
    isLoading.value = false;
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
