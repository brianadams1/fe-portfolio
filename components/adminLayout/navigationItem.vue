<template>
     <!-- No children Menus-->
     <li v-if="!menu.children" class="hover:text-secondary group">
        <NuxtLink :to="menu.to">
          <component
            :is="menu.icon"
            :size="20"
            class="text-white group-hover:text-secondary"
          />
          {{ menu.title }}
        </NuxtLink>
      </li>
      <!-- Have Children Menus-->
      <li v-if="menu.children">
        <details open>
          <summary>
            <component
              :is="menu.icon"
              :size="20"
              class="text-white group-hover:text-secondary"
            />
            {{ menu.title }}
          </summary>
          <!-- Children UL , Recursive Method (Summoning Its self)-->
          <ul>
            <template v-for="subMenu in menu.children">
                <AdminLayoutNavigationItem :menu="subMenu"/>
            </template>
          </ul>
        </details>
      </li>
</template>

<script setup>
defineProps({
    menu: Object
})

</script>