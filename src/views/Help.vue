<template>
  <app-page back title="Помощь">
    <question-item
      v-for="(item, index) in questions"
      :question="item"
      :key="index"
    />
  </app-page>
</template>

<script>
import QuestionItem from "../components/question/QuestionItem.vue";
import AppPage from "../components/ui/AppPage.vue";

export default {
  components: { AppPage, QuestionItem },
  setup() {
    const questions = [
      {
        title: "Что есть в данной системе?",
        text: "Тут есть всё",
      },
      {
        title: "Как тут работает авторизация?",
        text: "Всё реализовано через Firebase",
      },
    ];

    return { questions };
  },
};
</script>