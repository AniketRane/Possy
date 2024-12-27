import { defineStore } from "pinia";

export const useSettingsStore = defineStore('settings', {
    state: () => ({
        
        fontSize: 16,
        theme: 'light',
        onScreenKeyboard: false,
        
        sound: true,
        volume: 50,

        receiptPrinter: null,
        kotPrinter: null,

        databaseConnection : {
            host: '',
            port: '3306',
            database: '',
            user: '',
            password: ''
        }

    }),
    persist: true,
})