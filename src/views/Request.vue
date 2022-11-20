<template>
  <app-loader v-if="loading" />
  <app-page title="Заявка" v-else-if="request" :back="true">
    <p><strong>Имя владельца</strong> : {{ request.fio }}</p>
    <p><strong>Телефон</strong> : {{ request.phone }}</p>
    <p><strong>Сумма</strong> : {{ request.amount }}</p>
    <p><strong>Status</strong> : <app-status :type="request.status" /></p>

    <button class="btn danger" @click="remove">Удалить</button>
  </app-page>
  <h3 v-else class="text-center text-white">Заявки с id = {{ id }} нет</h3>
  <div v-if="request">{{ request.fio }}</div>
</template>

<script lang="ts">
import {
  computed,
  ComputedRef,
  onMounted,
  onUnmounted,
  ref,
  defineComponent,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import AppPage from "../components/ui/AppPage.vue";
import { useStore } from "@/store";
import AppLoader from "../components/ui/AppLoader.vue";
import AppStatus from "../components/ui/AppStatus.vue";
import { IRequest } from "@/types/IRequest";
import { RequiredProperty } from "@/types/IRequiredProperty";
export default defineComponent({
  components: { AppPage, AppLoader, AppStatus },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const loading = ref(true);
    onMounted(async () => {
      loading.value = true;
      await store.dispatch("request/loadById", route.params.id);
      loading.value = false;
    });

    onUnmounted(() => {
      store.commit("request/setRequest", null);
    });

    const remove = async () => {
      await store.dispatch("request/deleteRequest", route.params.id);
      router.push("/");
    };

    const request = computed(
      () =>
        store.state.request.request! as RequiredProperty<NonNullable<IRequest>>
    );
    return {
      request,
      loading,
      id: route.params.id,
      remove,
    };
  },
});
</script>

<style>
</style>