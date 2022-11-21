<template>
  <div class="filter">
    <div class="form-control">
      <input type="text" placeholder="Начните писать" v-model="name" />
    </div>

    <div class="form-control">
      <select v-model="status">
        <option disable selected>Выберите статус</option>
        <option value="done">Завершён</option>
        <option value="cancelled">Отменён</option>
        <option value="active">Активен</option>
        <option value="pending">Выполняется</option>
      </select>
    </div>

    <button v-if="isActive" @click="reset" class="btn warning">Очистить</button>
  </div>
</template>

<script lang="ts">
import { IFilterRequest } from "@/types/IFilterRequest";
import { ref, watch, computed, defineComponent, PropType } from "vue";

export default defineComponent({
  emits: {
    "update:modelValue": (values: IFilterRequest) => true,
  },
  props: {
    modelValue: {
      type: Object as PropType<IFilterRequest>,
      required: true,
    },
  },
  setup(_, ctx) {
    const name = ref<string>("");
    const status = ref<string>("");

    watch([name, status], (values: [string, string]) => {
      ctx.emit("update:modelValue", {
        name: values[0],
        status: values[1],
      });
    });

    const isActive = computed(() => name.value || status.value);

    const reset = () => {
      name.value = "";
      status.value = "";
    };

    return {
      name,
      status,
      isActive,
      reset
    };
  },
});
</script>

<style>
</style>