<template>
  <div class="sidebar" v-if="sidebar">
    <span class="sidebar-close" @click="close">&times;</span>

    <div class="sidebar-content">
      Добро пожаловать в систему по учёту заявок в нашем банке.
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/runtime-core";
import { useStore } from "@/store";
export default defineComponent({
  setup() {
    const store = useStore();

    const sidebar = computed(() => store.state.sidebar);

    return { sidebar, close: () => store.commit("closeSidebar") };
  },
});
</script>

<style>
</style>