<script setup lang="ts">
import { Marker, GoogleMap } from 'vue3-google-map';


const props = defineProps({
  lat: {
    type: Number
  },
  lng: {
    type: Number
  },
})

const googleApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
</script>

<template>
  <GoogleMap
    :api-key="googleApiKey"
    style="width: 100%; height: 500px"
    :center="{ lat: props.lat, lng: props.lng }"
    :zoom="15"
  >
    <slot />
  </GoogleMap>
</template>