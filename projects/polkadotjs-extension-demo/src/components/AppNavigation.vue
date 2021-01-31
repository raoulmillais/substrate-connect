<template>
<div class="container p-component">
  <h1>
    Polkadot JS Extension Demo
  </h1>
  <TabMenu :model="items" />
</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import type { RouterView, RouteParams } from 'vue-router';
import type { AppRouteNames } from '../router';
import { accounts } from '../store/accounts';

interface NavLink {
  name: AppRouteNames
  params?: Partial<RouteParams>
  title: string
  icon?: string
  display: 'all' | 'anonym' | 'authorized'
};

export default defineComponent({
  name: 'AppNavigation',
  setup () {
    const displayStatus = computed(() => accounts.length ? 'authorized' : 'anonym');
    const allNavLinks = computed<NavLink[]>(() => [
      {
        name: 'home',
        label: 'Home',
        to: '/',
        display: 'all',
        icon: 'pi pi-fw pi-home',
      },
      {
        name: 'console',
        label: 'Console',
        to: '/console',
        display: 'all',
        icon: 'pi pi-fw pi-inbox',
      },
      /*
      {
        name: 'accounts',
        label: 'Accounts',
        to: '/accounts',
        display: 'authorized',
        icon: 'wallet',
      },
      {
        name: 'transactions',
        label: 'Transactions',
        to: '/transactions',
        display: 'authorized',
        icon: 'cash',
      },
      */
    ]);

    const items = computed(() => allNavLinks.value.filter(
      l => l.display === displayStatus.value || l.display === 'all',
    ));
    return {
      items,
    };
  },
});
</script>
