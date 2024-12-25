<script setup lang="ts">
import { computed, onMounted, ref, watch, Ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useHousesStore } from '@/stores/houses'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import AddHouseForm from './components/AddHouseForm.vue'
import { user } from '@/stores/user';
import {useRouter} from "vue-router";


const router = useRouter()
const store = useHousesStore()

onMounted(() => {
  store.init()
})

if(!user){
  router.push('/auth')
}


const userHouses = ref([])

watch(
  () => [user, store.houses],
  (data: Ref[]) => {
    const userId = data[0].value.id
    if (userId) {
      userHouses.value = store.houses?.filter(house => house.userId === userId) || []
    } else {
      userHouses.value = []
    }
  },
  { immediate: true } // Trigger on initialization
)

const visible = ref<boolean>(false)
</script>

<template>
  <main class="w-full flex flex-col gap-2">
    <Button label="Add" @click="visible = true" class="w-20" />

    <Dialog
      v-model:visible="visible"
      modal
      header="Edit Profile"
      :style="{ width: '25rem' }"
    >
      <AddHouseForm @hide="visible = false" @update-data="store.init()" />
    </Dialog>
    <DataTable
      v-if="userHouses.length"
      :value="userHouses"
      class="w-full"
      size="large"
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]"
    >
      <Column field="adress" header="Адреса" />
      <Column field="numPlaces" header="Кількість місць" />
      <Column field="details" header="Опис" />
      <Column field="city.name" header="Місто" />
    </DataTable>
  </main>
</template>