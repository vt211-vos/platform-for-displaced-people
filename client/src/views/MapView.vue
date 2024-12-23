<script setup lang="ts">
import { Marker } from 'vue3-google-map';
import MapWrapper from '@/components/map/MapWrapper.vue';
import { useHousesStore } from '@/stores/houses'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGeolocation } from '@vueuse/core'


const store = useHousesStore();
const { coords } = useGeolocation()



onMounted(() => {
  store.init()

  console.log("coords", coords)
})

function getMarkerOptions(location: { longitude: number; latitude: number }) {
  return { position: { lat: location.latitude, lng: location.longitude } }
}
const router = useRouter();


</script>

<template>
  <div class="flex h-full gap-5">
    <MapWrapper
      :lat="coords.latitude"
      :lng="coords.longitude"
      v-if="coords"
    >
      <Marker
        :options="{position: { lat: coords.latitude, lng: coords.longitude }, label: 'Me'}"
      />
    <Marker
      v-for="({coordinate, id}, i) in store.houses"
      :key="i"
      :options="getMarkerOptions(coordinate)"
      @click="router.push(`/houses/${id}`)"
    />
    </MapWrapper>
<!--    <SelectedHotPlaceMenu v-if="mapStore.currentSelected?.type === 'HOT_PLACE'" />-->
<!--    <SelectedSupplyCenterMenu v-if="mapStore.currentSelected?.type === 'SUPPLY_CENTER'" />-->
  </div>
</template>