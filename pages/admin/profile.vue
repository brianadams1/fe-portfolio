<template>
  <div>
    <div class="font-semibold mb-5 border-b-2 border-white/30">
      Profile Setting
    </div>
    
    <div role="tablist" class="tabs tabs-lifted">
      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        class="tab"
        aria-label="Profile"
        checked
      />
      <div
        role="tabpanel"
        class="tab-content bg-base-100 border-base-300 rounded-box p-6"
      >
        <AdminProfile v-if="ProfileStore.profile != null" />
      </div>
      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        class="tab text-nowrap"
        aria-label="Social Media"
      />
      <div
        role="tabpanel"
        class="tab-content bg-base-100 border-base-300 rounded-box p-6"
      >
        <AdminProfileSocialMedia v-if="ProfileStore.profile != null" />
      </div>
    </div>
  </div>
</template>

<script setup>
// import {useCounterStore} from '../../stores/counterStore'
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});
const show = ref(true);
const ProfileStore = useProfileStore();
onBeforeMount(async () => {
  if (ProfileStore.profile == null) await ProfileStore.get();
});
</script>
<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
