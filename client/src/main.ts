import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Lara from '@primevue/themes/lara';
import "./assets/main.css"
import GoogleSignInPlugin from "vue3-google-signin"
import { useUserStore } from '@/stores/user';



import App from './App.vue'
import router from './router'

const app = createApp(App)


app.use(PrimeVue, {
  theme: {
    preset: Lara
  }
});
app.use(ToastService);
app.use(createPinia())
app.use(router)




console.log("config", import.meta.env.VITE_GOOGLE_CLIENT_ID)
app.use(GoogleSignInPlugin, {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
});



app.mount('#app')

const store = useUserStore();

store.init()