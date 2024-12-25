<script setup lang="ts">
import Select from 'primevue/select'
import {cities} from "@/constans/cities"
import {useHousesStore} from "@/stores/houses";
import {computed, onMounted} from "vue";
import {useRoute} from "vue-router";
import Button from 'primevue/button'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
import { toRaw, ref } from 'vue'



const store = useHousesStore();

const emits = defineEmits(['hide', 'updateData'])


const authSchema = yup.object({
  city: yup.object({ name: yup.string(), code: yup.string() }),
  numPlaces: yup.object({ name: yup.string(), code: yup.string() }),
})

const housesOriginal = ref([])

onMounted(async () => {
   await store.init()
   housesOriginal.value = store.houses
})


const { defineField, handleSubmit } = useForm({
  initialValues: {
    city: cities[0],
    numPlaces: { name: 1, code: 1 },
  },
  validationSchema: toTypedSchema(authSchema),
})

const onSubmit = handleSubmit(
  ({ numPlaces, city }) => {
    const houses = toRaw(housesOriginal.value)


    store.houses = houses.filter(house => {
      return house.numPlaces == numPlaces.code && house.city.name== city.name
    })

    emits('updateData')
  },
)

const [city] = defineField('city')
const [numPlaces] = defineField('numPlaces')

const getNumPlacesOptions = (houses: any) => {
  return [...new Set(houses.map(house => house.numPlaces))].sort().map(number => {
    return  { name: number, code: number }
  })
}

</script>
<template>
  <div>
    <form @submit="onSubmit" class="flex gap-2 align-mid mt-5 mb-5" >
    <Select v-model="city" :options="cities" filter optionLabel="city" placeholder="Місто" class="md:w-56">
      <template #value="slotProps">
        <div v-if="slotProps.value" class="flex items-center">
          <img :alt="slotProps.value.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`" style="width: 18px" />
          <div>{{ slotProps.value.name }}</div>
        </div>
        <span v-else>
            {{ slotProps.placeholder }}
        </span>
      </template>
      <template #option="slotProps">
        <div class="flex items-center">
          <img :alt="slotProps.option.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`" style="width: 18px" />
          <div>{{ slotProps.option.name }}</div>
        </div>
      </template>
    </Select>
    <Select
      v-model="numPlaces"
      placeholder="Кількість місць"
      :options="getNumPlacesOptions(housesOriginal)"
      optionLabel="name"
      type="number"
    />
    <div class="flex gap-2">
      <Button type="submit">Submit</Button>
    </div>
    </form>
  </div>
</template>