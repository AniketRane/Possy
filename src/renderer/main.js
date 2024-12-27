import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createPinia } from 'pinia'

import Notifications from '@kyvg/vue3-notification'

import './scss/main.scss';
// import './assets/tailwind.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App)
.use(pinia)
.use(router)
.use(Notifications)
.mount('#app')
