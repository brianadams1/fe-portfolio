<template>
  <input type="checkbox" class="modal-toggle" v-model="_show" />
  <div class="modal" role="dialog">
    <div class="modal-box">
      <form method="dialog">
        <label
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          @click="$emit('close')"
          >✕</label
        >
      </form>
      <div class="font-semibold text-xl mb-3">Select Skill</div>
      <div class="flex flex-col gap-5">
        <div v-for="c in SkillStore.skillsByCategory">
          <div class="font-medium text-base mb-1">
            {{ c.title }}
          </div>
          <div class="flex flex-nowrap gap-3">
            <!-- emit with args -->
            <button
              class="btn btn-sm capitalize"
              v-for="s in c.skill"
              :class="{
                'btn-primary text-accent':
                  selected.findIndex((i) => i.id == s.id) != -1,
              }"
              @click="
                $emit('addSkill', s);
                $emit('close');
              "
            >
              <div v-html="s.svg" class="w-5 h-5"></div>
              {{ s.title }}</button
            >
          </div>
        </div>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <label @click="$emit('close')"> </label>
    </form>
  </div>
</template>

<script setup>
defineEmits(["close", "addSkill"]);
const props = defineProps({
  show: Boolean,
  selected: Array,
});
const SkillStore = useSkillStore();

const _show = ref(false);
watchEffect(() => {
  _show.value = props.show;
});
</script>
