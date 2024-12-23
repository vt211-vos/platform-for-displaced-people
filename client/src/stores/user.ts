import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/lib/api';
// import { House } from '@/types/house'

type User = {
  id           :string
  email        :string
  role         :string
  details      :string
}

export const user = ref<User>();
export const useUserStore = defineStore('user', () => {

  async function init() {


    const {data} = await api.patch<User | undefined>('/users')
    if (!data) return

    user.value = data
  }

  return {init};
});