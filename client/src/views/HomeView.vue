<script setup lang="ts">
import { onMounted } from 'vue';
// import  Button, Column, DataTable, Dialog  from 'primevue';
import { useHousesStore } from '@/stores/houses';
import HouseCard from '@/components/house/HouseCard.vue'
import HouseFilters from '@/components/house/HouseFilters.vue'

const store = useHousesStore();

onMounted(() => {
  store.init();
});

</script>
<template>
  <main class="w-full flex flex-col gap-2">
  
    <HouseFilters/>
    <h1>
      Домівки
    </h1>
    <div class="flex flex-wrap gap-4">
      <HouseCard
          @update-data="store.houses"
          v-for="{id, adress, numPlaces, details, city, user} in store.houses"
          v-bind:key="id"
          :id="id"
          :adress="adress"
          :num-places="numPlaces"
          :details="details"
          :phone="user.phone"
          :city="city.name"/>
    </div>
  </main>
</template>