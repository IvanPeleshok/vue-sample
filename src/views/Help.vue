<template>
  <app-page back title="Помощь">
    <question-item
      v-for="(item, index) in questions"
      :question="item"
      :key="index"
    />
  </app-page>
</template>

<script lang="ts">
import { QUESTIONS_MAP } from "@/contants";
import { defineComponent } from "@vue/runtime-core";
import QuestionItem from "../components/question/QuestionItem.vue";
import AppPage from "../components/ui/AppPage.vue";

export default defineComponent({
  components: { AppPage, QuestionItem },
  setup() {
    return { questions: QUESTIONS_MAP };
  },
});
</script>