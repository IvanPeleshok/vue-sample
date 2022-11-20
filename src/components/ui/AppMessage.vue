<template>
  <div v-if="message" :class="['alert', message.type]">
    <p v-if="title" class="alert-title">{{ title }}</p>
    <p>{{ message.value }}</p>
    <span @click="close" class="alert-close">&times;</span>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { computed, defineComponent } from "vue";
export default defineComponent({
  setup() {
    const store = useStore();

    const TITLE_MAP = {
      primary: "Упешно!",
      danger: "Ошибка!",
      warning: "Внимание",
    };

    const message = computed(() => store.state.message);

    const title = computed(() =>
      message.value ? TITLE_MAP[message.value.type as keyof typeof TITLE_MAP] : null
    );

    return {
      message,
      title,
      close: () => store.commit("clearMessage"),
    };
  },
});
</script>

<style>
</style>