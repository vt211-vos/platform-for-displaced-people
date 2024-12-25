<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useReviewsStore } from '@/stores/reviews'
import {useRoute} from "vue-router";
import AddReviewForm from '@/components/reviews/AddReviewForm.vue'
import { user } from '@/stores/user'


const route = useRoute();
const store = useReviewsStore();


onMounted(async () => {
  await store.init()
})


const currents = computed(() => {
  const {id} = route.params;
  return store.reviews?.filter(review => review.houseId === id)
})

const props = defineProps({
  id: String
})


</script>

<template>
    <p>{{props?.id}}</p>
  <main class="w-full flex flex-col gap-2">
    <DataTable
      v-if="currents.length"
      :value="currents"
      class="w-full"
      size="large"
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]"
    >
      <Column field="user.name" header="Користувач" />
      <Column field="text" header="Текст" />
      <Column field="rate" header="Оцінка" />
      <Column field="houseId" header="houseId" />
    </DataTable>

    <AddReviewForm v-if="user?.role == 'USER'" @update-data="store.init()"/>
  </main>
</template>