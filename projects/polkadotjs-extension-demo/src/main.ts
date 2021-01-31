import { createApp } from 'vue';

import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css'; 
import 'primeflex/primeflex.css';

import App from './App.vue';
import { router } from './router'
import store from './store';

import registerGlobalComponents from './plugins/global-components';

const app = createApp(App);

app.use(PrimeVue);
registerGlobalComponents(app);
app.use(router);
app.use(store);


app.mount('#app');
