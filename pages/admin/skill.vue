<template>
  <div>
    <!-- TITLE -->
    <div
      class="font-semibold flex justify-between mb-5 pb-2 border-b-2 border-white/30"
    >
      <div class="text-xl font-bold"> Skill </div>
      <button class="flex btn btn-sm btn-neutral" @click="showForm = true">
        <LucidePlus class="w-4" />
        Add Skill
      </button>
    </div>

    <!-- MODAL CONFIRM -->
    <AdminModalConfirm
      :show="showDeleteModal"
      text_confirm="Remove"
      @close="showDeleteModal = false"
      @saved="deleteExp"
    >
      <div>
        <p class="font-bold text-2xl mb-3 text-center">Delete</p>
        <p class="mb-3">Are you sure you want to remove this Skill?</p>
        <p class="font-semibold mb-3 text-lg" v-if="deleteData">{{
          deleteData.company
        }}</p>
        <p class="text-sm">This action cannot be undone.</p>
      </div>
    </AdminModalConfirm>
    <AdminSkillForm :show="showForm" @close="showForm = false" />
    <!--  -->
    <div class="flex justify-between gap-10 h-16 items-start">
      <!-- FILTER -->
      <input
        type="text"
        v-model="filter"
        placeholder="Search"
        class="input input-bordered w-full max-w-xs"
      />
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

    <!-- TODO handle update -->
    <!-- TABLE -->
    <div class="overflow-x-visible">
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
          <tr v-for="s in dataTable">
            <th>
              <div v-html="s.svg" class="w-8 p-1 bg-white rounded-md"></div>
            </th>
            <td class="text-center">{{ s.title }}</td>
            <td class="text-center">{{ s.category.title }}</td>
            <!-- TODO project count -->
            <td class="text-center">{{ s._count.projects }}</td>
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
                  <li v-if="s._count.projects == 0">
                    <button
                      class="btn btn-error btn-sm pb-7 focus:bg-error"
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
const SkillStore = useSkillStore();
const showUpdateModal = ref();
const successAlert = ref();
const showDeleteModal = ref(false);
const updateData = ref(null);
const deleteData = ref(null);
const errors = ref({});
const fetchError = ref("");
onBeforeMount(async () => {
  if ((SkillStore.project = [])) await SkillStore.get();
});
const dataTable = computed(() => {
  const search = filter.value.toLowerCase().trim();
  if (search != "") {
    return SkillStore.data.filter((s) =>
      s.title.toLowerCase().includes(search)
    );
  } else {
    return SkillStore.data;
  }
});

// TODO count relation skillcategory & skill

const deleteExp = async () => {
  try {
    // TAKE ID
    const id = deleteData.value.id;

    // DELETE PROCESS
    await ExpStore.remove(id);

    // HIDE MODAL
    showDeleteModal.value = false;

    // SUCCESS MODAL
    successAlert.value = true;

    // REFRESH DATA
    await ExpStore.get();
  } catch (error) {
    // isLoading.value = false;
    console.log(error);
  }
};
const showForm = ref(false);
const createSkill = () => {
  showForm.value = false;
  successAlert.value = true;
  setTimeout(() => {
    successAlert.value = false;
  }, 1500);
};
</script>
