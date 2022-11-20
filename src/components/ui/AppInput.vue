<template>
  <div class="form-control">
    <label :for="id">{{ label }}</label>
    <input
      :type="type"
      :value="modelValue"
      :id="id"
      @input="change"
      @blur="$emit('blur')"
    />
    <small class="danger">{{ error }}</small>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: {
    "update:modelValue": (value?: any) => true,
    blur: (value?: any) => true,
  },
  props: ["label", "modelValue", "type", "id", "error"],
  setup(_, ctx) {
    const change = (event: Event) =>
      ctx.emit("update:modelValue", (event.target as HTMLInputElement).value);

    return {
      change,
    };
  },
});
</script>

<style>
</style>