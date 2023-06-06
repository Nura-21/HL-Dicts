import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import vuetify from '@/plugins/vuetify';

const app = createApp(App);

app.config.globalProperties.window = window;

const pinia = createPinia();

app.use(pinia).use(router).use(vuetify);

app.mount('#app');
