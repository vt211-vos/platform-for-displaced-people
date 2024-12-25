
<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { useToast } from 'primevue/usetoast'
import { api } from '@/lib/api'
import { AxiosError } from 'axios'
import Select from 'primevue/select'
import {cities} from '@/constans/cities'

const emits = defineEmits(['hide', 'updateData'])
import { useGetUser } from '@/stores/user';



function handleHide() {
  emits('hide')
}

const authSchema = yup.object({
  adress: yup.string().required(),
  details: yup.string().required(),
  numPlaces: yup.number().required(),
  city: yup.object({ name: yup.string(), code: yup.string() }),

})

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(authSchema),
})


const [adress] = defineField('adress')
const [numPlaces] = defineField('numPlaces')
const [details] = defineField('details')
const [city] = defineField('city');
const toast = useToast()

const onSubmit = handleSubmit(
  async ({ adress, numPlaces, details, city }) => {
    const user = await useGetUser();
    if(!user) return
    try {
      await api.post<{ token: string }>('/houses', {
        adress,
        numPlaces,
        details,
        city: city.name,
        userId: user.id,
      })
      emits('updateData')
      emits('hide')
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.add({
          severity: 'error',
          summary: error.response?.data.message,
          life: 2000,
        })
      }
    }
  },
)
</script>

<template>
  <form @submit="onSubmit">
    <div>
      <label class="block mt-5 mb-1" for="email">Aдреса</label>
      <InputText
        v-model="adress"
        aria-describedby="email-help"
        type="text"
        :class="{ 'p-invalid': errors.adress, 'w-full': true  }"
      />
      <small id="email-help" class="block">{{ errors.adress }}</small>
    </div>

    <div>
      <label class="block mt-5 mb-1" for="password">Кількість місць</label>
      <InputText
        v-model="numPlaces"
        min="1"
        aria-describedby="password-help"
        type="number"
        :class="{ 'p-invalid': errors.numPlaces, 'w-full': true  }"
      />
      <small id="password-help" class="block">{{ errors.numPlaces }}</small>
    </div>
    <div>
      <label class="block mt-5 mb-1" for="password">Опис</label>
      <InputText
        v-model="details"
        aria-describedby="password-help"
        type="text"
        :class="{ 'p-invalid': errors.details, 'w-full': true }"
      />
      <small id="password-help" class="block">{{ errors.details }}</small>
    </div>
    <div>
      <label class="block mt-5 mb-1" for="isAnonymous">Місто</label>
      <Select
        v-model="city"
        :options="cities"
        option-label="name"
        :default-option="cities[0]"
        :class="{ 'p-invalid': errors.city, 'w-full': true  }"
      />
      <small id="city-help" class="block">{{
          errors.city
        }}</small>
    </div>

    <div class="flex gap-2">
      <Button type="button" class="mt-5" @click="handleHide">Cancel</Button>
      <Button type="submit" class="mt-5">Submit</Button>
    </div>
  </form>
</template>
