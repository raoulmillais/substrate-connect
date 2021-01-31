import type { App } from 'vue'

import { RouterLink } from 'vue-router'
import Button from 'primevue/button';
import Card from 'primevue/card';
import TabMenu from 'primevue/tabmenu';

export default function registerGlobalComponents (app: App): void {
  app.component('router-link', RouterLink);
  app.component('Button', Button);
  app.component('Card', Card);
  app.component('TabMenu', TabMenu);
}
