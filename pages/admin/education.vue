<template>
  <div>
    <div
      class="font-semibold text-xl mb-5 pb-2 border-b-2 border-white/30 flex flex-col sm:flex-row justify-between"
    >
      <div class="flex gap-3">
        <LucideGraduationCap :size="24" />
        <p> Education </p>
      </div>
      <div>
        <button
          class="btn btn-neutral btn-sm"
          @click="
            showForm = true;
            editData = null;
          "
        >
          <LucidePlus :size="16" />
          Add Education
        </button>
      </div>
    </div>

    <!-- MODALS -->

    <!-- MODAL CONFIRM -->
    <AdminModalConfirm
      :show="showDeleteModal"
      text_confirm="Remove"
      @close="showDeleteModal = false"
      @saved="deleteEdu"
    >
      <div>
        <p class="font-bold text-2xl mb-3 text-center">Delete</p>
        <p class="mb-3">Are you sure you want to delete this Education?</p>
        <p class="font-semibold mb-3 text-lg" v-if="deleteData">
          {{ deleteData.institutionName }}
        </p>
        <p class="text-sm">This action cannot be undone.</p>
      </div>
    </AdminModalConfirm>
    <!-- MODAL FORM -->
    <AdminEducationsForm
      :show="showForm"
      text_confirm="Save"
      @close="showForm = false"
      @saved="save"
      :data="editData"
    />
    <div class="flex gap-10 justify-between relative">
      <!-- FILTER -->
      <input
        type="text"
        v-model="filter"
        placeholder="Search"
        class="input input-bordered w-full mb-3"
      />
      <!-- ALERT -->
      <div class="mx-auto w-full h-12 mb-2 absolute">
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
            <th>Institution Name</th>
            <th class="text-center">Period</th>
            <th class="text-center">Major</th>
            <th class="text-center">Degree</th>

            <th class="text-center">Action</th>
          </tr>
        </thead>
        <!-- TABLE BODY -->
        <tbody>
          <!-- DATA LOOP -->
          <tr v-for="e in dataTable">
            <th>{{ e.institutionName }}</th>
            <td class="text-center"
              >{{ e.startYear }} - {{ e.endYear || "Present" }}</td
            >
            <td class="text-center">{{ e.major == null ? "-" : e.major }}</td>
            <td class="text-center">{{ e.degree == null ? "-" : e.degree }}</td>
            <td class="text-center">
              <div class="dropdown">
                <div tabindex="0" role="button" class="btn m-1 btn-sm">
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
                        editData = e;
                      "
                    >
                      <LucideFilePenLine :size="20" />
                    </button>
                  </li>
                  <li>
                    <button
                      class="btn btn-error btn-sm pb-7"
                      @click="
                        // when clicked, show the modal
                        showDeleteModal = true;
                        // then send loop data to modal
                        deleteData = e;
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
        v-for="e in dataTable"
        class="card w-full bg-base-100 shadow-xl shadow-neutral"
      >
        <div class="card-body max-sm:p-4">
          <div class="flex justify-between mb-3">
            <div class="flex flex-col gap-3">
              <h2 class="card-title font-semibold">{{ e.institutionName }}</h2>
              <p class="text-sm"
                >{{ e.startYear }} - {{ e.endYear || "Present" }}</p
              >
            </div>
            <div class="dropdown dropdown-bottom dropdown-end">
              <div
                tabindex="0"
                role="button"
                class="btn btn-outline border-none"
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
                      editData = e;
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
                      deleteData = e;
                    "
                  >
                    <LucideTrash2 :size="20" />
                    Remove
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div class="grid sm:grid-cols-10 max-sm:grid-rows-2 gap-4">
            <button class="sm:col-span-6 flex justify-between btn btn-neutral">
              <div>Major :</div>
              <div>{{ e.major == null ? "-" : e.major }}</div>
            </button>
            <button class="sm:col-span-4 flex justify-between btn btn-neutral">
              <div>Degree :</div>
              <div>{{ e.degree == null ? "-" : e.degree }}</div>
            </button>
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
const EduStore = useEducationStore();
const successAlert = ref(false);
const showUpdateModal = ref(false);
const editData = ref(null);
const errors = ref({});
const fetchError = ref("");
onBeforeMount(async () => {
  await EduStore.get();
});

const dataTable = computed(() => {
  const search = filter.value.toLowerCase().trim();
  if (search != "") {
    return EduStore.educations.filter((f) =>
      f.institutionName.toLowerCase().includes(search)
    );
  } else {
    return EduStore.educations;
  }
});

const saveEdu = async () => {
  showUpdateModal.value = false;
  await EduStore.get();
  // SUCCESS MODAL
  successAlert.value = true;
  setTimeout(() => {
    successAlert.value = false;
  }, 1500);
};

// DELETE
const showDeleteModal = ref(false);
const deleteData = ref(null);
const deleteEdu = async () => {
  try {
    // TAKE ID
    const id = deleteData.value.id;

    // DELETE PROCESS
    await EduStore.remove(id);

    // HIDE MODAL
    showDeleteModal.value = false;

    // SUCCESS MODAL
    successAlert.value = true;
    setTimeout(() => {
      successAlert.value = false;
    }, 1500);

    // REFRESH DATA
    await EduStore.get();
  } catch (error) {
    // isLoading.value = false;
    console.log(error);
  }
};

// CREATE
const showForm = ref(false);
const save = async () => {
  showForm.value = false;

  await EduStore.get();
  // SUCCESS MODAL
  successAlert.value = true;
  setTimeout(() => {
    successAlert.value = false;
  }, 1500);
};

// UPDATE
</script>
