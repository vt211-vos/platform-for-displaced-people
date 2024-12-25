<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Rating from 'primevue/rating';
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { useToast } from 'primevue/usetoast'
import { api } from '@/lib/api'
import { AxiosError } from 'axios'

const emits = defineEmits(['hide', 'updateData'])
import { useGetUser } from '@/stores/user';
import {useRoute} from "vue-router";


const route = useRoute();

const authSchema = yup.object({
  text: yup.string().required(),
  rate: yup.number().required(),
})

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(authSchema),
})


const [text] = defineField('text')
const [rate] = defineField('rate')
const toast = useToast()

const onSubmit = handleSubmit(
  async ({ text, rate }) => {
    const {id} = route.params;

    const user = await useGetUser();
    if(!user) return
    try {

      await api.post<{ token: string }>('/reviews', {
        text,
        rate,
        houseId: id,
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
  <h2>Дотати відгук</h2>
  <form @submit="onSubmit">
    <div>
      <label class="block mt-5 mb-1" for="email">Текст</label>
      <InputText
        v-model="text"
        aria-describedby="email-help"
        type="text"
        :class="{ 'p-invalid': errors.text, 'w-full': true  }"
      />
      <small id="email-help" class="block">{{ errors.text }}</small>
    </div>

    <Rating v-model="rate" :cancel="false" :readonly="false" :stars="5" :icon="null" :class="{ 'p-invalid': errors.rate, 'w-full': true  }" />


    <div class="flex gap-2">
      <Button type="submit" class="mt-5">Submit</Button>
    </div>
  </form>
</template>
