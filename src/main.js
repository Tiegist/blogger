import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import 'primeicons/primeicons.css'
// some changes in main js
createApp(App).use(store).use(router).mount('#app')
