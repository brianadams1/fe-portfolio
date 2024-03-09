<template>
  <div>
    <!-- TITLE -->
    <div
      class="font-semibold text-xl mb-5 pb-2 border-b-2 border-white/30 flex flex-col max-sm:gap-5 sm:flex-row justify-between"
    >
      <div class="flex gap-3">
        <LucideBriefcase :size="24" />
        <p> Experience </p>
      </div>
      <div class="flex justify-end">
        <button
          class="btn btn-neutral btn-sm"
          @click="
            showForm = true;
            editData = null;
          "
        >
          <LucidePlus :size="16" />
          Add Experience
        </button>
      </div>
    </div>

    <!-- MODAL CONFIRM -->
    <LazyAdminModalConfirm
      v-if="showDeleteModal"
      :show="showDeleteModal"
      text_confirm="Remove"
      @close="showDeleteModal = false"
      @saved="deleteExp"
    >
      <div>
        <p class="font-bold text-2xl mb-3 text-center">Delete</p>
        <p class="mb-3">Are you sure you want to remove this Experience?</p>
        <p class="font-semibold mb-3 text-lg" v-if="editData">{{
          editData.company
        }}</p>
        <p class="text-sm">This action cannot be undone.</p>
      </div>
    </LazyAdminModalConfirm>
    <LazyAdminExperienceForm
      v-if="showForm"
      :show="showForm"
      @close="showForm = false"
      @saved="saved"
      :data="editData"
    ></LazyAdminExperienceForm>

    <!-- TOP CONTENT -->
    <div class="flex justify-between gap-10 h-16 items-start relative">
      <!-- FILTER -->
      <input
        type="text"
        v-model="filter"
        placeholder="Search"
        class="input input-bordered w-[70%]"
      />
      <!-- ALERT -->
      <div class="mx-auto w-64 h-12 mb-2 absolute z-10 right-0">
        <!-- SUCCESS ALERT -->

        <Transition name="slide-fade" :duration="550">
          <LazyAdminSuccessAlert v-if="successAlert" class="z-20" />
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

    <!-- TABLE -->
    <div class="overflow-x-visible max-lg:hidden">
      <table class="table table-zebra">
        <!-- TABLE HEAD -->
        <thead>
          <tr>
            <th>Company name</th>
            <th class="text-center">Title</th>
            <!-- <th class="text-center">Description</th> -->
            <th class="text-center">Period</th>

            <th class="text-center">Action</th>
          </tr>
        </thead>
        <!-- TABLE BODY -->
        <tbody v-if="ExpStore.experiences">
          <!-- DATA LOOP -->
          <tr v-for="e in dataTable">
            <th class="capitalize">
              <div>
                {{ e.company }}
              </div>
              <div class="text-xs font-semibold">
                {{ e.location }}
              </div>
            </th>

            <td class="text-center capitalize">{{ e.title }}</td>
            <!-- <td class="text-center text-ellipsis overflow-hidden">{{
              e.description
            }}</td> -->
            <td class="text-center"
              >{{ e.readStartDateTime }} - {{ e.readEndDateTime }}</td
            >

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
                      class="btn btn-error btn-sm pb-7 focus:bg-error"
                      @click="
                        // when clicked, show the modal
                        showDeleteModal = true;
                        // then send loop data to modal
                        editData = e;
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
        <AdminExperienceSkeletonTable v-else />
      </table>
    </div>

    <!-- MOBILE VIEW -->
    <div class="lg:hidden flex flex-col gap-2 sm:gap-4">
      <div
        v-if="ExpStore.experiences"
        v-for="e in dataTable"
        class="card w-full bg-base-100 shadow-xl shadow-neutral"
      >
        <div class="card-body max-sm:p-4">
          <div class="flex justify-between mb-2">
            <div class="flex flex-col gap-2">
              <h2 class="card-title font-semibold capitalize">{{
                e.company
              }}</h2>
              <p class="text-sm capitalize">{{ e.location }}</p>
            </div>
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
                      editData = e;
                    "
                  >
                    <LucideTrash2 :size="20" />
                    Remove
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div class="flex flex-col gap-4">
            <div class="flex justify-between flex-wrap">
              <div>Period date :</div>
              <div>
                {{ e.readStartDateTime }} -
                {{ e.readEndDateTime || "Present" }}
              </div>
            </div>
            <div class="flex justify-between flex-wrap">
              <div>Title :</div>
              <div class="capitalize">{{ e.title }}</div>
            </div>
          </div>
        </div>
      </div>
      <AdminExperienceSkeletonMobile v-else />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});
const filter = ref("");
const ExpStore = useExperienceStore();

const successAlert = ref(false);
const showDeleteModal = ref(false);

const errors = ref({});
const fetchError = ref("");
onBeforeMount(async () => {
  await ExpStore.get();
});
const dataTable = computed(() => {
  const search = filter.value.toLowerCase().trim();
  if (search != "") {
    return ExpStore.experiences.filter((f) =>
      f.company.toLowerCase().includes(search)
    );
  } else {
    return ExpStore.experiences;
  }
});

// handle save
const showForm = ref(false);
const editData = ref(null);
const saved = async () => {
  // close form modal
  showForm.value = false;
  // re-fetch data
  await ExpStore.get();
  // show success alert
  successAlert.value = true;
  setTimeout(() => {
    // hide success alert after 1.5 secs
    successAlert.value = false;
  }, 1500);
};

// handle delete
const deleteExp = async () => {
  try {
    // TAKE ID
    const id = editData.value.id;

    // DELETE PROCESS
    await ExpStore.remove(id);

    // HIDE MODAL
    showDeleteModal.value = false;

    // SUCCESS MODAL
    successAlert.value = true;
    setTimeout(() => {
      successAlert.value = false;
    }, 3000);

    // REFRESH DATA
    await ExpStore.get();
  } catch (error) {
    // isLoading.value = false;
    console.log(error);
  }
};
</script>
