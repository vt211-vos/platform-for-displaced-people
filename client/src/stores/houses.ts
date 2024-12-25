import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/lib/api';
// import { House } from '@/types/house'

type Coordinate = {
  latitude: number
  longitude: number
}
type City = {
  name: string
}

type UserPhone = {
  phone: string
}
type House = {
  id           :string
  adress       :string
  numPlaces    :number
  details      :string
  userId       :string
  coordinate: Coordinate
  city: City
  user: UserPhone
}


export const useHousesStore = defineStore('houses', () => {
  const houses = ref<House[]>([]);

  async function init() {
    const {data} = await api.get<House[]>('/houses')
    if (!data) return

    houses.value = data
  }

  return {houses, init};
});