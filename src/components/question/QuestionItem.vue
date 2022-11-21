<template>
  <div class="question" @click="isOpen = !isOpen">
    <div class="question-title">{{ question.title }}</div>
    <div v-if="isOpen" class="question-body">{{ question.text }}</div>
  </div>
</template>

<script lang="ts">
import { IQuestion } from "@/types/IQuestions";
import { ref, PropType, defineComponent } from "vue";

export default defineComponent({
  props: {
    question: {
      type: Object as PropType<IQuestion>,
      required: true,
    },
  },
  setup() {
    const isOpen = ref(false);
    return {
      isOpen
    };
  },
});
</script>

<style>
</style>