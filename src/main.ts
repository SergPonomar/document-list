import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/scss/global.scss'
import App from '@/App.vue'
import router from '@/router'
import apiClient from '@/api/client'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(apiClient)

app.mount('#app')
