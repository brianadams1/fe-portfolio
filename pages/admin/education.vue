<template>
  <div>
    <div class="font-semibold text-xl mb-5 border-b-2 border-white/30">
      Profile Setting
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
    <!-- MODAL CONFIRM -->
    <AdminModalConfirm
      :show="showDeleteModal"
      text_confirm="Remove"
      @close="showDeleteModal = false"
      @saved="deleteEdu"
    >
      <div>
        <p class="font-bold text-2xl mb-3 text-center">Delete</p>
        <p class="mb-3">Are you sure you want to remove this Education?</p>
        <p class="font-semibold mb-3 text-lg" v-if="deleteData">{{
          deleteData.institutionName
        }}</p>
        <p class="text-sm">This action cannot be undone.</p>
      </div>
    </AdminModalConfirm>
    <!-- FILTER -->
    <input
      type="text"
      v-model="filter"
      placeholder="Search"
      class="input input-bordered w-full max-w-xs"
    />
    <!-- TODO handle update -->
    <!-- TABLE -->
    <div class="overflow-x-visible">
      <table class="table table-zebra">
        <!-- TABLE HEAD -->
        <thead>
          <tr>
            <th>Institution Name</th>
            <th class="text-center">Period</th>
            <th class="text-center">Major</th>
            <th class="text-center">Degree</th>
            <!-- FIXME -->
            <th class="text-center">Action</th>
          </tr>
        </thead>
        <!-- TABLE BODY -->
        <tbody>
          <!-- DATA LOOP -->
          <tr v-for="e in dataTable">
            <th>{{ e.institutionName }}</th>
            <td class="text-center">{{ e.startYear }} - {{ e.endYear }}</td>
            <td class="text-center">{{ e.major == null ? "-" : e.major }}</td>
            <td class="text-center">{{ e.degree == null ? "-" : e.degree }}</td>
            <td class="text-center">
              <details class="dropdown">
                <summary class="btn m-1 btn-sm">
                  <LucideMoreVertical />
                </summary>
                <ul
                  tabindex="0"
                  class="dropdown-content z-[1] menu shadow bg-neutral-300 rounded-box gap-3"
                >
                  <li>
                    <button
                      class="btn btn-warning btn-sm pb-7"
                      @click="
                        // when clicked, show the modal
                        showUpdateModal = true;
                        // then send loop data to modal
                        updateData = e;
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
              </details>
            </td>
          </tr>
        </tbody>
      </table>
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
const showUpdateModal = ref(false);
const successAlert = ref(false);
const showDeleteModal = ref(false);
const updateData = ref(null);
const deleteData = ref(null);
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

    // REFRESH DATA
    await EduStore.get();
  } catch (error) {
    // isLoading.value = false;
    console.log(error);
  }
};
</script>
