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
          {{ data ? "Update " + data.title : "Create new blog" }}
        </h3>
      </div>
      <div>
        <!-- BLOG TITLE -->
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text"> Blog title </span>
          </div>
          <input
            type="text"
            placeholder="Title"
            class="input input-bordered w-full bg-neutral"
            v-model="formData.title"
          />
        </label>
        <!-- BLOG CONTENT -->
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text"> Blog title </span>
          </div>
          <input
            type="text"
            placeholder="Title"
            class="input input-bordered w-full bg-neutral"
            v-model="formData.title"
          />
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
  title: "",
  content: "",
  // category: "",
});
watchEffect(() => {
  _show.value = props.show;
  formData.value = {
    title: props.data ? props.data.title : "",
    content: props.data ? props.data.content : "",
    //   photos: props.data ? props.data.photos : "",
  };
  //reset form
});

//   const categories = ref([]);

const errors = ref({});
const fetchError = ref("");
//   // handle save
//   const SkillStore = useSkillStore();
//   const save = async () => {
//     // reset error
//     errors.value = {};
//     fetchError.value = "";
//     try {
//       // show loading indicator
//       isLoading.value = true;
//       if (!props.data) await SkillStore.create(formData.value);
//       else await SkillStore.update(props.data.id, formData.value);
//       // hide loading indicator
//       isLoading.value = false;
//       emit("saved");
//       await SkillStore.get();
//       formData.value = {
//         svg: "",
//         title: "",
//         category: "",
//       };
//     } catch (error) {
//       isLoading.value = false;
//       if (error instanceof Joi.ValidationError) {
//         errors.value = joierror(error);
//       } else {
//         if (error.data) fetchError.value = error.data.message;
//         else console.log(error); //code error
//       }
//     }
//   };
</script>
