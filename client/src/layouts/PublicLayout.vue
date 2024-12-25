<script lang="ts" setup>
import {useRouter} from "vue-router";
import {user} from '@/stores/user'


const router = useRouter()

function handleLogout() {
  localStorage.removeItem('token')
  router.push('/auth')

  user.value = undefined
}
</script>

<template>
  <main>
    <nav class="border-b-2 border-emerald-500 p-4 flex justify-between">
      <div class="flex gap-4">
        <RouterLink to="/">
          Головна
        </RouterLink>
        <RouterLink to="/map">
          Карта
        </RouterLink>
      </div>
      <div class="flex gap-4">
        <RouterLink to="/admin" v-if="user && user.role === 'VOLUNTEER'">
          Адмін панель
        </RouterLink>
        <RouterLink to="/user" v-if="user && user.role === 'USER'">
          Користувач
        </RouterLink>
        <button @click="handleLogout" v-if="user">
          Вийти
        </button>
        <RouterLink v-else-if="!user" to="/auth">
          Увійти
        </RouterLink>
      </div>
    </nav>
  </main>
</template>