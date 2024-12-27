import { defineStore } from "pinia";

export const useRestaurantStore = defineStore('restaurant', {
    state: () => ({
        name: 'Perfitos',
        address: 'Chunabhatti, Mumbai, India',
        phone: '8181040454',
    }),
    persist: true,
})