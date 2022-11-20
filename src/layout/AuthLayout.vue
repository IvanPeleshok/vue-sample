<template>
  <div class="container">
    <app-message />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppMessage from "../components/ui/AppMessage.vue";
export default defineComponent({
  components: { AppMessage },
});
</script>

<style>
</style>