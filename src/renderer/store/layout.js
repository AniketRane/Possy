import { defineStore } from "pinia";

export const useLayoutStore = defineStore('layout', {
    state: () => ({
        left: 10,
        middle: 55,
        right: 35,
    }),
    persist: true,
})