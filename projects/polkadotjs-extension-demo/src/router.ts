import { createRouter, createWebHistory, RouteParams } from 'vue-router';
import Home from './pages/Home.vue';
import Console from './pages/Console.vue';
import Accounts from './pages/Accounts.vue';
import Transactions from './pages/Transactions.vue';
import Transaction from './pages/Transaction.vue';

export type AppRouteNames = 'home'
| 'console'
| 'accounts'
| 'transactions';

export const router = createRouter({
  history: createWebHistory(),
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
    {
      name: 'accounts',
      path: '/accounts',
      component: Accounts,
    },
    {
      name: 'transactions',
      path: '/transactions/:account',
      component: () => Transactions,
    },
    {
      name: 'transaction',
      path: '/transaction/:hash',
      component: () => Transaction,
    },
  ],
});

export function routerPush (name: AppRouteNames, params?: RouteParams): ReturnType<typeof router.push> {
  if (params !== undefined) return router.push({ name, params })
  else return router.push({ name })
};
