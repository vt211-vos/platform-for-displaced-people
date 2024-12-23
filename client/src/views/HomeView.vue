<script setup lang="ts">
import { onMounted } from 'vue';
// import  Button, Column, DataTable, Dialog  from 'primevue';
import { useHousesStore } from '@/stores/houses';
import HouseCard from '@/components/house/HouseCard.vue'

const store = useHousesStore();

onMounted(() => {
  store.init();
});

// const visible = ref<boolean>(false);

// async function handleDelete(id: number) {
//   await api.delete(`/products/${id}`);
//   await store.init();
// }
</script>
<template>
  <main class="w-full flex flex-col gap-2">


    <h1>
      Домівки
    </h1>
    <div class="flex flex-wrap gap-4">
      <HouseCard
          v-for="{id, adress, numPlaces, details, city} in store.houses"
          v-bind:key="id"
          :id="id"
          :adress="adress"
          :num-places="numPlaces"
          :details="details"
          :city="city.name"/>
    </div>
  </main>
</template>