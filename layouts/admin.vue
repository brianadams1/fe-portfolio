<template>
  <div
    data-theme="dim"
    class="w-screen h-screen max-w-screen min-h-screen overflow-x-hidden"
  >
    <!-- MOBILE HEADER -->
    <div class="lg:hidden h-[70px] relative border-b border-black/20 px-3">
      <div class="h-full flex justify-between items-center">
        <a href="" class="flex-none flex gap-4 items-center">
          <SvgMonas class="w-8" />
        </a>

        <label for="menu-toggle" class="btn btn-ghost">
          <LucideAlignRight :size="24" />
        </label>
      </div>
    </div>

    <!-- MAIN HEADER -->
    <div
      class="h-[70px] relative border-b border-black/20 px-3 lg:px-8 md:py-0 mb-12"
    >
      <div class="h-full flex items-center lg:divide-x divide-black/20">
        <!-- sisi kiri -->
        <a href="" class="max-lg:hidden flex-none flex gap-4 items-center pr-4">
          <SvgMonas class="w-8" />
          <div class="font-archy text-2xl capitalize">
            {{ AuthStore.user.name }}
          </div>
        </a>

        <!-- sisi kanan -->
        <div class="grow flex justify-end items-center lg:pl-4">
          <!-- breadcrumb -->
          <!-- <div class="text-sm breadcrumbs flex-wrap">
            <ul>
              <li><a>Home</a></li>
              <li><a>Documents</a></li>
              <li>Add Document</li>
            </ul>
          </div> -->

          <!-- avatar / account -->
          <div class="dropdown dropdown-end">
            <div
              tabindex="0"
              role="button"
              class="btn w-10 h-10 min-h-10 btn-circle overflow-hidden"
            >
              <div class="flex justify-center items-center">
                <img
                  v-if="ProfileStore.avatar"
                  :src="apiUri + ProfileStore.avatar"
                  :alt="ProfileStore.profile.firstName"
                />
                <LucideUser v-else :size="24" class="text-primary" />
              </div>
            </div>
            <div
              class="dropdown-content z-[2] menu bg-base-100 shadow rounded w-52"
            >
              <div class="p-2 border-b">
                <div class="font-semibold">{{ AuthStore.user.name }}</div>
                <div class="text-xs">{{ AuthStore.user.email }}</div>
              </div>
              <ul tabindex="0" class="mt-2">
                <li>
                  <NuxtLink to="/admin/user">
                    <LucideUser :size="16" /> User Setting
                  </NuxtLink>
                </li>
                <li>
                  <button @click="AuthStore.logout">
                    <LucideLogOut :size="16" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CONTENT -->
    <div class="w-full px-3 lg:px-8 pb-8">
      <div class="wrapper drawer lg:drawer-open rounded-2xl lg:rounded-3xl">
        <input id="menu-toggle" type="checkbox" class="drawer-toggle" />
        <!-- MAIN CONTENT -->
        <div
          class="lg:z-[1] z-0 drawer-content bg-neutral max-lg:rounded-2xl rounded-r-2xl lg:rounded-r-3xl"
        >
          <div
            class="w-full min-h-[75vh] lg:min-h-[80vh] bg-base-100 rounded-2xl lg:rounded-3xl p-3 lg:p-8"
          >
            <slot></slot>
          </div>
        </div>
        <div
          class="drawer-side lg:!inline-table lg:bg-neutral rounded-l-none lg:rounded-l-3xl h-full overflow-hidden"
        >
          <label
            for="menu-toggle"
            aria-label="close sidebar"
            class="drawer-overlay"
          ></label>
          <div class="lg:w-full lg:h-full lg:z-[1]">
            <!-- NAVIGATION -->
            <AdminLayoutNavigation />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import "v-calendar/style.css";
const AuthStore = useAuthStore();

const config = useRuntimeConfig();
const apiUri = config.public.apiUri;
const ProfileStore = useProfileStore();
onBeforeMount(async () => {
  if (!ProfileStore.profile) await ProfileStore.get();
});
</script>

<style scoped>
body > div > div[data-theme] {
  background-image: url("./bg-main.svg");
}

.wrapper::before {
  content: "";
  width: 95%;
  -webkit-animation: 0.4s intro-wrapper-animation ease-in-out 0.33333s;
  animation: 0.4s intro-wrapper-animation ease-in-out 0.33333s;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
  border-radius: 1.3rem;
  position: absolute;
  left: 0px;
  right: 0px;
  margin-left: auto;
  margin-right: auto;
  margin-top: -1rem;
  height: 100px;
  background-color: rgb(255 255 255 / 0.2);
  z-index: 0;
}

@keyframes intro-wrapper-animation {
  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}
</style>
