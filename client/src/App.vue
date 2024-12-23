<script setup lang="ts">
import {RouterView} from 'vue-router'
import Toast from "primevue/toast";
import PublicLayout from '@/layouts/PublicLayout.vue'
</script>

<template>
  <PublicLayout/>
  <RouterView/>
  <Toast/>
</template>
