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
      <div class="mx-auto w-full h-12 mb-2 absolute text-sm">
        <!-- SUCCESS ALERT -->

        <Transition name="slide-fade" :duration="550">
          <LazyAdminSuccessAlert v-if="successAlert" />
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
        <Transition name="slide-fade" :duration="550">
          <!-- ERROR FROM FETCH -->

          <LazyAdminErrorAlert v-if="fetchError">
            {{ fetchError }}
          </LazyAdminErrorAlert>
        </Transition>
      </div>
    </div>
    <!-- FORM -->
    <!-- TITLE & STATUS -->
    <div class="flex justify-between mb-3 gap-5 max-lg:flex-col">
      <!-- TITLE -->
      <label class="form-control grow">
        <div class="label">
          <span class="label-text font-semibold"> Title </span>
        </div>
        <input
          type="text"
          placeholder="Title"
          class="input input-bordered w-full bg-neutral font-bold"
          v-model="formData.title"
        />
      </label>
      <!-- STATUS -->
      <div class="grow flex lg:flex-col gap-5 items-center py-2">
        <div class="text-sm ml-1 text-nowrap font-semibold">Status : </div>
        <div class="flex">
          <div class="form-control">
            <label class="label cursor-pointer flex gap-1">
              <input
                type="radio"
                v-model="formData.status"
                name="status"
                class="radio checked:bg-indigo-500"
                value="ON_PROGRESS"
              />
              <span class="label-text text-nowrap"> On progress </span>
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
      </div>
    </div>
    <!-- PHOTOS -->
    <div class="block">
      <div class="label">
        <span class="label-text font-semibold"> Photos :</span>
      </div>
      <div class="overflow-auto">
        <!-- LOOP PHOTOS -->
        <div class="flex flex-nowrap gap-3">
          <div
            v-if="!photoPreviews.length"
            class="h-40 aspect-video bg-neutral/40 rounded"
          >
          </div>
          <div
            v-for="(p, i) in photoPreviews"
            class="min-w-60 max-w-60 aspect-video rounded-lg bg-neutral/10 flex justify-center items-center relative"
          >
            <img :src="p" class="max-h-full max-w-full" />
            <!-- DROPDOWN -->
            <div
              class="dropdown dropdown-bottom dropdown-end absolute top-0 right-0"
            >
              <div
                tabindex="0"
                role="button"
                class="btn btn-sm px-1 rounded-md bg-black/30 m-1 border-0"
              >
                <LucideMoreVertical :size="16" />
              </div>
              <ul
                tabindex="0"
                class="dropdown-content z-[1] menu p-2 shadow bg-ase-300 rounded-box w-32"
              >
                <li>
                  <button
                    class="btn btn-error btn-sm my-1"
                    @click="
                      photoPreviews.splice(i, 1);
                      photoFiles.splice(i, 1);
                    "
                  >
                    <LucideTrash2 :size="16" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        multiple
        @change="handleFile"
        :disabled="photoPreviews.length >= 10"
        class="mt-2 cursor-pointer block w-full text-sm text-slate-500"
      />
    </div>
    <div class="grid sm:grid-cols-2 gap-2">
      <!-- COMPANY -->
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text font-semibold">Company </span>
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
          <span class="label-text font-semibold"> URL </span>
        </div>
        <input
          type="text"
          placeholder="Title"
          class="input input-bordered w-full bg-neutral"
          v-model="formData.url"
        />
      </label>
      <!-- GITHUB -->
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text font-semibold"> Github </span>
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
          <span class="label-text font-semibold"> Gitlab </span>
        </div>
        <input
          type="text"
          placeholder="Title"
          class="input input-bordered w-full bg-neutral"
          v-model="formData.gitlab"
        />
      </label>
    </div>
    <!-- DOB & SKILLS -->
    <div class="flex justify-between gap-5 max-lg:flex-col mt-3">
      <!-- DOB -->
      <div class="flex flex-col gap-1">
        <label
          class="form-control w-full md:max-w-xs max-w-full flex-row items-center gap-3"
        >
          <div
            class="label label-text pb-3 items-end font-semibold text-nowrap"
          >
            Start Date :</div
          >
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
          <div
            class="label label-text pb-3 items-end font-semibold text-nowrap"
          >
            End Date :</div
          >
          <DatePicker v-model="formData.endDate" color="gray">
            <template #default="{ togglePopover }">
              <button
                @click="togglePopover"
                class="btn btn-outline border-neutral w-fit min-w-32"
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
        </label>
      </div>
      <!-- SKILL SELECTOR -->
      <div class="mt-2 grow">
        <div class="flex items-center gap-3">
          <div class="text-sm font-semibold">Skills</div>
          <button
            class="btn btn-neutral btn-xs my-2"
            @click="showSkillSelector = true"
          >
            <LucidePlus :size="15" />
            Add skill
          </button>
        </div>
        <div
          class="card min-h-20 w-full bg-neutral/20 p-4 flex flex-row flex-wrap"
        >
          <template v-for="s in selectedSkills">
            <button class="btn btn-neutral btn-sm w-max m-3">
              <div v-html="s.svg" class="w-5 h-5"></div>
              {{ s.title }}
            </button>
          </template>
        </div>
      </div>
    </div>

    <!-- DESCRIPTION -->
    <label class="form-control w-full">
      <div class="label">
        <span class="label-text font-semibold"> Description </span>
      </div>
      <textarea
        type="text"
        rows="5"
        placeholder="Description"
        class="textarea textarea-bordered w-full bg-neutral"
        v-model="formData.description"
      ></textarea>
    </label>

    <!-- BUTTON -->
    <div class="flex justify-end gap-3 my-4">
      <NuxtLink to="/admin/projects" class="btn btn-error btn-sm"
        >Cancel</NuxtLink
      >
      <button class="btn btn-info btn-sm" @click="showCreateConfirm = true">
        Save
        <SvgCat v-show="isLoading" class="w-10" />
      </button>
    </div>

    <LazyAdminProjectsSkillSelector
      v-if="showSkillSelector"
      :show="showSkillSelector"
      @close="showSkillSelector = false"
      @addSkill="addSkill"
      :selected="selectedSkills"
    />
    <LazyAdminModalConfirm
      v-if="showCreateConfirm"
      :show="showCreateConfirm"
      text_confirm="Create"
      @close="showCreateConfirm = false"
      @saved="handleSave"
      ><div>
        <p class="text-2xl font-semibold mb-3">Create new project</p>
        <p>Are you sure to save these changes?</p>
      </div>
    </LazyAdminModalConfirm>
  </div>
</template>

<script setup>
// ========================================================
// ====================== PREPARATION =====================
import Joi from "joi";
import dayjs from "dayjs";
import { DatePicker } from "v-calendar";
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

// STORES
const SkillStore = useSkillStore();
const ProjectStore = useProjectStore();

// REACTIVE COMPONENT
const successAlert = ref(false);
const showCreateConfirm = ref(false);
const isLoading = ref(false);
const photoPreviews = ref([]);
const photoFiles = [];
const errors = ref({});
const fetchError = ref("");
const isPresent = ref(true);
const showSkillSelector = ref(false);
const selectedSkills = ref([]);

// ======================================================

// ==================== METHODS =========================

// ======================================================

onBeforeMount(async () => {
  await SkillStore.get_skill_categories();
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

// ====================== HANDLE PRESENT ==================
const handlePresent = (e) => {
  isPresent.value = e.target.checked;
  if (isPresent.value) formData.value.endDate = "";
};

// ===================== HANDLE FILE ====================
const handleFile = (e) => {
  if (e.target.files.length) {
    for (const file of e.target.files) {
      // convert file to data url
      // readable data in tag <img src>
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        if (photoPreviews.value.length < 10) {
          photoFiles.push(file);
          photoPreviews.value.push(reader.result);
        }
      };
    }
  }
  // reset
  e.target.value = "";
};

// ==================== HANDLE SKILLS ====================
const addSkill = (s) => {
  const i = selectedSkills.value.findIndex((i) => i.id == s.id);
  if (i == -1) selectedSkills.value.push(s);
  else selectedSkills.value.splice(i, 1);
};

// ==================== HANDLE SAVE ====================
const handleSave = async () => {
  errors.value = {};
  fetchError.value = "";
  showCreateConfirm.value = false;
  try {
    isLoading.value = true;
    const dataSave = { ...formData.value };
    // end date if null
    if (!dataSave.endDate) dataSave.endDate = null;

    // skill {array of id}
    const skill_ids = selectedSkills.value.map((s) => s.id);
    await ProjectStore.create(dataSave, skill_ids, photoFiles);
    successAlert.value = true;
    setTimeout(() => {
      successAlert.value = false;
    }, 1500);
    navigateToSkills("/admin");
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
