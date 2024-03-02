<template>
  <div>
    <!-- TITLE -->
    <div
      class="font-semibold text-xl mb-5 pb-2 border-b-2 border-white/30 flex flex-col max-sm:gap-5 sm:flex-row justify-between"
    >
      <div class="flex gap-3">
        <LucideWrench :size="24" />
        <p> Skill </p>
      </div>
      <div class="flex justify-end">
        <button
          class="flex btn btn-sm btn-neutral"
          @click="
            showForm = true;
            editData = null;
          "
        >
          <LucidePlus class="w-4" />
          Add Skill
        </button>
      </div>
    </div>

    <!-- MODAL CONFIRM -->
    <AdminModalConfirm
      :show="showDeleteModal"
      text_confirm="Remove"
      @close="showDeleteModal = false"
      @saved="deleteSkill"
    >
      <div>
        <p class="font-bold text-2xl mb-3 text-center">Delete</p>
        <p class="mb-3">Are you sure you want to remove this Skill?</p>
        <p class="font-semibold mb-3 text-lg" v-if="editData">
          {{ editData.title }}
        </p>
        <p class="text-sm">This action cannot be undone.</p>
      </div>
    </AdminModalConfirm>
    <AdminSkillForm
      :show="showForm"
      :data="editData"
      @close="showForm = false"
      @saved="saved"
    />
    <!--  -->
    <div class="flex justify-between gap-10 h-16 items-start">
      <!-- FILTER -->
      <div class="flex gap-3 w-full items-end">
        <input
          type="text"
          v-model="filter"
          placeholder="Search"
          class="input input-bordered w-full max-w-xs"
        />
        <!-- CATERGORY SELECTOR -->
        <select
          v-model="selectedCategory"
          @change="filter = ''"
          class="select select-bordered w-full max-w-xs"
        >
          <option value="all">All Categories</option>
          <option v-for="cat in SkillStore.categories" :value="cat.id">
            {{ cat.title }}
          </option>
        </select>
      </div>
      <!-- ALERT -->
      <div class="mx-auto w-[80%] h-12 mb-2">
        <!-- SUCCESS ALERT -->

        <Transition name="slide-fade" :duration="550">
          <AdminSuccessAlert v-if="successAlert" />
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
        <Transition name="slide-fade" :duration="550">
          <!-- ERROR FROM FETCH -->

          <AdminErrorAlert v-if="fetchError">
            {{ fetchError }}
          </AdminErrorAlert>
        </Transition>
      </div>
    </div>

    <!-- TABLE -->
    <div class="overflow-x-visible max-lg:hidden">
      <table class="table table-zebra">
        <!-- TABLE HEAD -->
        <thead>
          <tr>
            <th>SVG</th>
            <th class="text-center">Title</th>
            <th class="text-center">Category</th>
            <!-- <th class="text-center">Description</th> -->
            <th class="text-center">Projects</th>

            <th class="text-center">Action</th>
          </tr>
        </thead>
        <!-- TABLE BODY -->
        <tbody>
          <!-- DATA LOOP -->
          <tr v-for="skill in dataTable">
            <th>
              <div
                v-html="skill.svg"
                class="w-8 h-8 p-1 bg-white rounded-md"
              ></div>
            </th>
            <td class="text-center">{{ skill.title }}</td>
            <td class="text-center">{{ skill.category.title }}</td>

            <td class="text-center">{{ skill._count.projects }}</td>
            <td class="text-center">
              <div class="dropdown">
                <div class="btn m-1 btn-sm" tabindex="0" role="button">
                  <LucideMoreVertical />
                </div>
                <ul
                  tabindex="0"
                  class="dropdown-content z-[1] menu shadow bg-neutral-300 rounded-box gap-3"
                >
                  <li>
                    <button
                      class="btn btn-warning btn-sm pb-7"
                      @click="
                        // when clicked, show the modal
                        showForm = true;
                        // then send loop data to modal
                        editData = skill;
                      "
                    >
                      <LucideFilePenLine :size="20" />
                    </button>
                  </li>
                  <li v-if="skill._count.projects == 0">
                    <button
                      class="btn btn-error btn-sm pb-7 focus:bg-error"
                      @click="
                        // when clicked, show the modal
                        showDeleteModal = true;
                        // then send loop data to modal
                        editData = skill;
                      "
                    >
                      <LucideTrash2 :size="20" />
                    </button>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- MOBILE VIEW -->
    <div class="lg:hidden flex flex-col gap-2 sm:gap-4">
      <div
        v-for="s in dataTable"
        class="card w-full bg-base-100 shadow-xl shadow-neutral"
      >
        <div class="card-body max-sm:p-4">
          <div class="flex justify-between mb-2">
            <div class="flex items-start gap-3">
              <div
                v-html="s.svg"
                class="w-16 h-16 p-1 bg-white rounded-md"
              ></div>
              <div class="flex flex-col gap-2">
                <h2 class="card-title font-semibold capitalize">{{
                  s.title
                }}</h2>
                <p class="text-sm capitalize">{{ s.category.title }}</p>
              </div>
            </div>
            <!-- DROPDOWN -->
            <div class="dropdown dropdown-bottom dropdown-end">
              <div
                tabindex="0"
                role="button"
                class="btn btn-outline border-none p-0"
              >
                <LucideMoreVertical />
              </div>
              <ul
                tabindex="0"
                class="dropdown-content z-[1] menu shadow bg-neutral-300 rounded-box gap-3"
              >
                <li>
                  <button
                    class="btn btn-warning btn-sm pb-7"
                    @click="
                      // when clicked, show the modal
                      showForm = true;
                      // then send loop data to modal
                      editData = s;
                    "
                  >
                    <LucideFilePenLine :size="20" />
                    Edit
                  </button>
                </li>
                <li>
                  <button
                    class="btn btn-error btn-sm pb-7"
                    @click="
                      // when clicked, show the modal
                      showDeleteModal = true;
                      // then send loop data to modal
                      editData = s;
                    "
                  >
                    <LucideTrash2 :size="20" />
                    Remove
                  </button>
                </li>
              </ul>
            </div>
            <!-- END DROPDOWN -->
          </div>

          <div class="flex justify-between flex-wrap items-center">
            <div>Amount projects : </div>
            <div
              class="w-10 h-10 rounded-full bg-slate-500 flex items-center justify-center"
              >{{ s._count.projects }}</div
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});
const filter = ref("");
const SkillStore = useSkillStore();
const getData = async () => {
  await Promise.all([SkillStore.get_categories(), SkillStore.get()]);
};
onBeforeMount(async () => await getData());

// FORM
const showForm = ref(false);
const editData = ref(null);

// SELECTOR
const selectedCategory = ref("all");
const dataTable = computed(() => {
  const search = filter.value.toLowerCase().trim();
  const selectedCatID = selectedCategory.value;
  if (search != "") {
    return SkillStore.skills.filter((s) => {
      const title = s.title.toLowerCase();
      // if category is all / not choosed
      if (selectedCatID == "all") return title.includes(search);
      //else if a category is selected
      else return title.includes(search) && s.skillCategoryId == selectedCatID;
    });
  } else {
    if (selectedCatID == "all") {
      // return all data
      return SkillStore.skills;
    } else {
      // return category by id
      return SkillStore.skills.filter(
        (s) => s.skillCategoryId == selectedCatID
      );
    }
  }
});

// Down below is changed code
// console.log(SkillStore.category);
const successAlert = ref();
const showDeleteModal = ref(false);
const errors = ref({});
const fetchError = ref("");

const deleteSkill = async () => {
  try {
    // TAKE ID
    const id = editData.value.id;
    console.log(id);

    // DELETE PROCESS
    await SkillStore.remove(id);

    // HIDE MODAL
    showDeleteModal.value = false;

    // SUCCESS MODAL
    successAlert.value = true;
    setTimeout(() => {
      successAlert.value = false;
    }, 1500);

    // REFRESH DATA
    await SkillStore.get();
  } catch (error) {
    // isLoading.value = false;
    // console.log(error);
  }
};
const saved = async () => {
  showForm.value = false;
  await getData();
  successAlert.value = true;
  setTimeout(() => {
    successAlert.value = false;
  }, 1500);
};
</script>
