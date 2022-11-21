<template>
  <app-loader v-if="loading" />
  <app-page v-else title="Список заявок">
    <template #header>
      <button @click="modal = true" class="btn primary">Создать</button>
    </template>

    <request-filter v-model="filter" />
    <request-table :requests="requests"></request-table>

    <teleport to="body">
      <app-modal v-if="modal" title="Создать заявку" @close="modal = false">
        <request-modal @created="modal = false"></request-modal>
      </app-modal>
    </teleport>
  </app-page>
</template>

<script lang="ts">
import AppPage from "../components/ui/AppPage.vue";
import RequestTable from "../components/request/RequestTable.vue";
import { ref, computed, onMounted, defineComponent } from "vue";
import AppModal from "../components/ui/AppModal.vue";
import RequestModal from "../components/request/RequestModal.vue";
import { useStore } from "@/store";
import AppLoader from "../components/ui/AppLoader.vue";
import RequestFilter from "../components/request/RequestFilter.vue";
import { IRequest } from "@/types/IRequest";
import { IFilterRequest } from "@/types/IFilterRequest";
export default defineComponent({
  components: {
    AppPage,
    RequestTable,
    AppModal,
    RequestModal,
    AppLoader,
    RequestFilter,
  },
  setup() {
    const store = useStore();
    const modal = ref(false);
    const loading = ref(false);
    const filter = ref<IFilterRequest>({ name: null, status: null });

    onMounted(async () => {
      loading.value = true;
      await store.dispatch("request/load");
      loading.value = false;
    });

    const requests = computed(() =>
      store.getters["request/requests"]
        .filter((request: IRequest) => {
          if (filter.value.name) {
            return request.fio!.includes(filter.value.name);
          }

          return request;
        })
        .filter((request: IRequest) => {
          if (filter.value.status) {
            return request.status === filter.value.status;
          }

          return request;
        })
    );

    return {
      modal,
      requests,
      loading,
      filter,
    };
  },
});
</script>
