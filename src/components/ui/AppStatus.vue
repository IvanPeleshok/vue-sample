<template>
  <span :class="['badge', className]">{{ text }}</span>
</template>

<script lang="ts">
import { CLASSES_MAP, TEXT_MAP } from "@/contants";
import { defineComponent, ref } from "vue";
export default defineComponent({
  props: {
    type: {
      type: String,
      requried: true,
    },
  },
  setup(props) {
    const className = ref(CLASSES_MAP[props.type as keyof typeof CLASSES_MAP]);
    const text = ref(TEXT_MAP[props.type as keyof typeof TEXT_MAP]);

    return {
      className,
      text,
    };
  },
});
</script>

<style>
</style>