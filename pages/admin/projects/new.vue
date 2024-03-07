<template>
  <div class="w-full">
    <div
      class="relative font-semibold text-xl mb-5 pb-2 border-b-2 border-white/30 flex flex-col sm:flex-row justify-between"
    >
      <div class="flex gap-3">
        <LucideFolderKanban :size="24" />
        <p> New Project </p>
      </div>

      <!-- ALERT -->
      <div
        class="mx-auto w-full h-12 mb-2"
        :class="successAlert == true ? 'absolute' : 'hidden'"
      >
        <!-- SUCCESS ALERT -->

        <Transition name="slide-fade" :duration="550">
          <AdminSuccessAlert v-if="successAlert" />
        </Transition>
      </div>
    </div>
    <!-- FORM -->
    <!-- TITLE -->
    <label class="form-control w-full">
      <div class="label">
        <span class="label-text"> Title </span>
      </div>
      <input
        type="text"
        placeholder="Title"
        class="input input-bordered w-full bg-neutral font-bold"
        v-model="formData.title"
      />
    </label>
    <!-- STATUS -->
    <div class="flex gap-5 items-center py-2">
      <div class="text-sm ml-1">Status : </div>
      <div class="form-control">
        <label class="label cursor-pointer flex gap-1">
          <input
            type="radio"
            v-model="formData.status"
            name="status"
            class="radio checked:bg-indigo-500"
            value="ON_PROGRESS"
          />
          <span class="label-text"> On progress </span>
        </label>
      </div>
      <div class="form-control">
        <label class="label cursor-pointer flex gap-1">
          <input
            type="radio"
            v-model="formData.status"
            name="status"
            class="radio checked:bg-indigo-500"
            value="MAINTENANCE"
          />
          <span class="label-text"> Maintenance </span>
        </label>
      </div>
      <div class="form-control">
        <label class="label cursor-pointer flex gap-1">
          <input
            type="radio"
            v-model="formData.status"
            name="status"
            class="radio checked:bg-indigo-500"
            value="COMPLETE"
          />
          <span class="label-text"> Complete </span>
        </label>
      </div>
    </div>
    <!-- DOB -->
    <div class="flex gap-3">
      <label
        class="form-control w-full md:max-w-xs max-w-full flex-row items-center gap-3"
      >
        <div class="label label-text pb-3 items-end"> Start Date :</div>
        <DatePicker v-model="formData.startDate" color="gray">
          <template #default="{ togglePopover }">
            <button
              @click="togglePopover"
              class="btn btn-outline border-neutral w-fit min-w-32"
            >
              {{ dayjs(formData.startDate).format("DD MMMM YYYY") }}
            </button>
          </template>
        </DatePicker>
      </label>
      <label
        class="form-control w-full md:max-w-xs max-w-full flex-row items-center gap-3"
      >
        <div class="label label-text pb-3 items-end"> End Date :</div>
        <DatePicker v-model="formData.endDate" color="gray">
          <template #default="{ togglePopover }">
            <button
              @click="togglePopover"
              class="btn btn-outline border-neutral w-fit min-w-32"
              :disabled="isPresent"
            >
              {{
                isPresent ? " " : dayjs(formData.endDate).format("DD MMMM YYYY")
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
      </label>
    </div>

    <div class="grid sm:grid-cols-2 gap-2">
      <!-- COMPANY -->
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Company </span>
        </div>
        <input
          type="text"
          placeholder="Title"
          class="input input-bordered w-full bg-neutral"
          v-model="formData.company"
        />
      </label>
      <!-- URL -->
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text"> URL </span>
        </div>
        <input
          type="text"
          placeholder="Title"
          class="input input-bordered w-full bg-neutral"
          v-model="formData.url"
        />
      </label>
      GITHUB
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text"> Github </span>
        </div>
        <input
          type="text"
          placeholder="Title"
          class="input input-bordered w-full bg-neutral"
          v-model="formData.github"
        />
      </label>
      <!-- GITLAB -->
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text"> Gitlab </span>
        </div>
        <input
          type="text"
          placeholder="Title"
          class="input input-bordered w-full bg-neutral"
          v-model="formData.gitlab"
        />
      </label>
    </div>
    <!-- DESCRIPTION -->
    <label class="form-control w-full">
      <div class="label">
        <span class="label-text"> Description </span>
      </div>
      <textarea
        type="text"
        rows="5"
        placeholder="Description"
        class="textarea textarea-bordered w-full bg-neutral"
        v-model="formData.description"
      ></textarea>
    </label>
  </div>
</template>

<script setup>
import Joi from "joi";
import dayjs from "dayjs";
import { DatePicker } from "v-calendar";
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

const SkillStore = useSkillStore();

onBeforeMount(async () => {
  if (!SkillStore.skills) await SkillStore.get();
});

const formData = ref({
  title: "",
  description: "",
  startDate: new Date(),
  endDate: new Date(),
  status: "ON_PROGRESS",
  url: "",
  github: "",
  gitlab: "",
  company: "",
});
const errors = ref({});
const fetchError = ref("");

// handle present
const isPresent = ref(true);
const handlePresent = (e) => {
  isPresent.value = e.target.checked;
  if (isPresent.value) formData.value.endDate = "";
};
</script>
