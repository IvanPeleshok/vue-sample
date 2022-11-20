<template>
  <form @submit.prevent="onSubmit">
    <app-input
      v-model="fio"
      type="text"
      id="fio"
      label="ФИО"
      @blur="fBlur"
      :error="fError"
      :class="{ invalid: fError }"
    ></app-input>

    <app-input
      v-model="phone"
      id="phone"
      type="text"
      label="Телефон"
      @blur="pBlur"
      :error="pError"
      :class="{ invalid: pError }"
    ></app-input>

    <app-input
      v-model="amount"
      id="amount"
      type="number"
      label="Сумма заявки"
      @blur="aBlur"
      :error="aError"
      :class="{ invalid: aError }"
    ></app-input>

    <div class="form-control">
      <label :for="status">Статус</label>
      <select id="status" v-model="status">
        <option value="done">Завершен</option>
        <option value="cancelled">Отменен</option>
        <option value="active">Активен</option>
        <option value="pending">Выполняется</option>
      </select>
    </div>

    <button class="btn primary" :disabled="isSubmitting">Создать</button>
  </form>
</template>

<script lang="ts">
import AppInput from "../ui/AppInput.vue";
import { useRequestForm } from "../../use/request-form";
import { useStore } from "@/store";
import { IRequest } from "../../types/IRequest";
import { defineComponent } from "@vue/runtime-core";
export default defineComponent({
  components: { AppInput },
  emits: ["created"],
  setup(_, ctx) {
    const store = useStore();
    const submit = async (values: IRequest) => {
      await store.dispatch("request/create", values);
      ctx.emit("created");
    };

    return {
      ...useRequestForm(submit as any),
    };
  },
});
</script>

<style>
</style>