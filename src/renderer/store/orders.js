import { defineStore } from "pinia";

export const useOrdersStore = defineStore('orders', {
    state: () => ({
        tables: {}
    }),
    persist: true,
})