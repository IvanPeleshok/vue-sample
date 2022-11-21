<template>
  <nav class="navbar">
    <h3>Online Bank</h3>
    <ul class="navbar-menu">
      <li>
        <router-link to="/">Заявки</router-link>
      </li>
      <li>
        <router-link to="/help">Помощь</router-link>
      </li>
      <li>
        <a href="#" @click.prevent="open">Сообщения</a>
      </li>
      <li>
        <a @click.prevent="logout" href="#">Выход</a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();

    const logout = () => {
      store.commit("auth/logout");
      router.push("/auth");
    }

    const open = () => store.commit("openSidebar");

    return {
      logout,
      open
    };
  },
});
</script>
<style>
</style>