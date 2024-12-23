<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Select from 'primevue/select'
import SelectButton from 'primevue/selectbutton'
import { toTypedSchema } from '@vee-validate/yup'
import { api } from '@/lib/api'
import { AxiosError } from 'axios'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import { user } from '@/stores/user';


import { GoogleSignInButton, type CredentialResponse } from 'vue3-google-signin'

// handle success event
const handleLoginSuccess = async (response: CredentialResponse) => {
  try {
    const { credential } = response


    const { data } = await api.post(
      '/login',
      {},
      {
        headers: {
          Authorization_GOOGLE: `Bearer ${credential}`,
        },
      },
    )

    localStorage.setItem('token', data.accessToken)
    await router.push('/')
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.add({
        severity: 'error',
        summary: error.response?.data.message,
        life: 2000,
      })
    }
  }

}

// handle an error event
const handleLoginError = () => {
  console.error('Login failed')
}

const router = useRouter()
const typeOptions = ['Login', 'Register']
const roleOptions = [
  { name: 'User', code: 'USER' },
  { name: 'Volunteer', code: 'VOLUNTEER' },
]

const authSchema = yup.object({
  type: yup.string().required(),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  name: yup.string().when('type', {
    is: 'Register',
    then: schema => schema.required('Name is required'),
    otherwise: schema => schema.notRequired(),
  }),
  phone: yup.string().when('type', {
    is: 'Register',
    then: schema =>
      schema
        .required('Phone is required')
        .matches(/^\+?[0-9]{10,14}$/, 'Phone number is invalid'),
    otherwise: schema => schema.notRequired(),
  }),
  role: yup.object({ name: yup.string(), code: yup.string() }).when('type', {
    is: 'Register',
    then: schema => schema.required('Role is required'),
    otherwise: schema => schema.notRequired(),
  }),
})

const { defineField, handleSubmit, errors } = useForm({
  initialValues: {
    role: roleOptions[0],
    type: typeOptions[0],
  },
  validationSchema: toTypedSchema(authSchema),
})

const [type] = defineField('type')
const [email] = defineField('email')
const [password] = defineField('password')
const [phone] = defineField('phone')
const [name] = defineField('name')
const [role] = defineField('role')

const toast = useToast()

type User = {
  id           :string
  email        :string
  role         :string
  details      :string
}

const onSubmit = handleSubmit(
  async ({ type, password, phone, name, role, email }) => {
    const isRegister = type === 'Register'
    try {
      const { data } = await api.post<{ accessToken: string, user: User }>(
        isRegister ? '/register' : '/login',
        {
          email,
          password,
          phone,
          name,
          role: role.code,
        },
      )

      localStorage.setItem('token', data.accessToken)
      console.log("data", data)

      user.value = data.user

      await router.push('/')
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
  <main class="bg-surface-50 dark:bg-surface-950 p-10">
    <div
      class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded-border flex flex-col gap-5"
    >
      <form @submit="onSubmit">
        <SelectButton v-model="type" :options="typeOptions" />

        <div>
          <label class="block mt-5 mb-1" for="email">Email</label>
          <InputText
            v-model="email"
            aria-describedby="email-help"
            type="email"
            :class="{ 'p-invalid': errors.email }"
          />
          <small id="email-help" class="block">{{ errors.email }}</small>
        </div>

        <div>
          <label class="block mt-5 mb-1" for="password">Password</label>
          <InputText
            v-model="password"
            aria-describedby="password-help"
            type="password"
            :class="{ 'p-invalid': errors.password }"
          />
          <small id="password-help" class="block">{{ errors.password }}</small>
        </div>

        <div v-show="type === 'Register'">
          <div>
            <label class="block mt-5 mb-1" for="name">Name</label>
            <InputText
              v-model="name"
              aria-describedby="name-help"
              :class="{ 'p-invalid': errors.name }"
            />
            <small id="name-help" class="block">{{ errors.name }}</small>
          </div>

          <div>
            <label class="block mt-5 mb-1" for="phone">Phone</label>
            <InputText
              v-model="phone"
              aria-describedby="phone-help"
              :class="{ 'p-invalid': errors.phone }"
            />
            <small id="phone-help" class="block">{{ errors.phone }}</small>
          </div>

          <Select
            class="mt-5"
            v-model="role"
            :options="roleOptions"
            optionLabel="name"
          />
        </div>

        <Button type="submit" class="mt-5"> Submit </Button>
      </form>
      <GoogleSignInButton
        v-if="type === 'Login'"
        @success="handleLoginSuccess"
        @error="handleLoginError"
      ></GoogleSignInButton>
    </div>
  </main>
</template>
