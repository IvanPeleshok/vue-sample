<template>
  <span :class="['badge', className]">{{ text }}</span>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  props: {
    type: {
      type: String,
      requried: true,
    },
  },
  setup(props) {
    const classesMap = {
      active: "primary",
      cancelled: "danger",
      done: "primary",
      pending: "warning",
    };

    const textMap = {
      active: "Активен",
      cancelled: "Отменён",
      done: "Завершён",
      pending: "Выполняется",
    };

    const className = ref(
      classesMap[(props as any).type as keyof typeof textMap]
    );
    const text = ref(textMap[(props as any).type as keyof typeof textMap]);

    return {
      className,
      text,
    };
  },
});
</script>

<style>
</style>