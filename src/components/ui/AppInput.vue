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
    "update:modelValue": (value: string) => true,
    blur: () => true,
  },
  props: {
    label: {
      type: String
    },
    modelValue: {
      type: String
    },
    type: {
      type: String
    },
    id: {
      type: String
    },
    error: {
      type: String
    }
  },
  setup(_, ctx) {
    const change = (event: Event) =>
      ctx.emit("update:modelValue", (event.target as HTMLInputElement).value);

    return {
      change
    };
  },
});
</script>

<style>
</style>