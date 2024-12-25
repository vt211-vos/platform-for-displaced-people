import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/lib/api';
// import { House } from '@/types/house'

type Review = {
  id      :string,
  text    :string,
  rate    :number,
  houseId :string,
  User: User
}

type User = {
  name: string,
}


export const useReviewsStore = defineStore('reviews', () => {
  const reviews = ref<Review[]>([]);

  async function init() {
    const {data} = await api.get<Review[]>('/reviews')
    if (!data) return

    reviews.value = data
  }

  return {reviews, init};
});