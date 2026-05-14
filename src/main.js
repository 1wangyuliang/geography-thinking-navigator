import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initData } from './utils/storage'
import './style.css'

initData()

const app = createApp(App)
app.use(router)
app.mount('#app')