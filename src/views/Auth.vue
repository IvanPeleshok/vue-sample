<template>
  <form class="card" @submit.prevent="onSubmit">
    <h1>Войти в систему</h1>

    <div :class="['form-control', { invalid: eError }]">
      <label for="email">Логин</label>
      <input type="email" id="email" v-model="email" @blur="eBlur" />
      <small v-if="eError">{{ eError }}</small>
    </div>

    <div :class="['form-control', { invalid: pError }]">
      <label for="password">Пароль</label>
      <input type="password" id="password" v-model="password" @blur="pBlur" />
      <small v-if="pError">{{ pError }}</small>
    </div>

    <button
      :disabled="isTooManyAttempts || isSubmitting"
      class="btn primary"
      type="submit"
    >
      Войти
    </button>
    <span class="text-danger" v-if="isTooManyAttempts">
      Вы слишком часто пытаетесь войти в систему, попробуйте позже
    </span>
  </form>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import { useStore } from "@/store";
import { useLoginForm } from "@/use/login-form";
import { error } from "@/utils/error";
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    const route = useRoute();
    const store = useStore();
    if (route.query.message) {
      store.dispatch("setMessage", {
        value: error(route.query.message as any),
        type: "warning",
      });
    }

    return { ...useLoginForm() };
  },
});
</script>

<style>
</style>