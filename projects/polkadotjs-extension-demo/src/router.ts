import { createRouter, createWebHashHistory, RouteParams } from 'vue-router';
import Home from './pages/Home.vue';
import Console from './pages/Console.vue';

export type AppRouteNames = 'home'
| 'console'
| 'accounts'
| 'transactions';

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home,
    },
    {
      name: 'console',
      path: '/console',
      component: Console,
    },
    /*
    {
      name: 'accounts',
      path: '/accounts',
      component: () => import('./pages/Accounts.vue'),
    },
    {
      name: 'transactions',
      path: '/transactions/:account',
      component: () => import('./pages/Transactions.vue'),
    },
    {
      name: 'transaction',
      path: '/transaction/:hash',
      component: () => import('./pages/Transaction.vue'),
    },
   */
  ],
});

export function routerPush (name: AppRouteNames, params?: RouteParams): ReturnType<typeof router.push> {
  if (params !== undefined) return router.push({ name, params })
  else return router.push({ name })
};
