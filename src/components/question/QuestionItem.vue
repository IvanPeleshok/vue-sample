<template>
  <div class="question" @click="isOpen = !isOpen">
    <div class="question-title">{{ question.title }}</div>
    <div v-if="isOpen" class="question-body">{{ question.text }}</div>
  </div>
</template>

<script lang="ts">
import { ref, PropType, defineComponent } from "vue";
import { IQuestion } from "../../types/IQuestions";

export default defineComponent({
  props: {
    question: {
      type: Object as PropType<IQuestion>,
      required: true,
    },
  },
  setup() {
    return {
      isOpen: ref<boolean>(false),
    };
  },
});
</script>

<style>
</style>