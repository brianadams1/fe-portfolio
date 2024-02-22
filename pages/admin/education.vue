<template>
  <div>
    <div class="font-semibold text-xl mb-5 border-b-2 border-white/30">
      Profile Setting
    </div>
    <AdminEducationsRemove
      v-if="deleteData"
      :show="showDeleteModal /* show only when true*/"
      :data="deleteData /* data from loop*/"
      @close="showDeleteModal = false"
      @deleted="getEdu"
    />
    <AdminEducationsUpdate
      v-if="updateData"
      :show="showUpdateModal /* show only when true*/"
      :data="updateData /* data from loop*/"
      @close="showUpdateModal = false"
      @deleted="getEdu"
    />
    <input
      type="text"
      v-model="filter"
      placeholder="Search"
      class="input input-bordered w-full max-w-xs"
    />
    <!-- TODO handle delete & update -->
    <div class="overflow-x-visible">
      <table class="table table-zebra">
        <!-- head -->
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
        <tbody>
          <!-- row 1 -->
          <tr v-for="e in dataTable">
            <th>{{ e.institutionName }}</th>
            <td class="text-center">{{ e.startYear }} - {{ e.endYear }}</td>
            <td class="text-center">{{ e.major == null ? "-" : e.major }}</td>
            <td class="text-center">{{ e.degree == null ? "-" : e.degree }}</td>
            <!-- FIXME using dropdown-->
            <td class="text-center">
              <div class="dropdown dropdown-right">
                <div tabindex="0" role="button" class="btn m-1 btn-sm">
                  <LucideMoreVertical />
                </div>
                <ul
                  tabindex="0"
                  class="dropdown-content z-[1] menu shadow bg-neutral-300 rounded-box gap-3"
                >
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
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
// import {useCounterStore} from '../../stores/counterStore'
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});
const filter = ref("");
const EduStore = useEducationStore();
const showUpdateModal = ref(false);
const showDeleteModal = ref(false);
const updateData = ref(null);
const deleteData = ref(null);
onBeforeMount(async () => {
  await EduStore.get();
});
const getEdu = async () => {
  showDeleteModal.value = false;
  await EduStore.get();
};

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
</script>
