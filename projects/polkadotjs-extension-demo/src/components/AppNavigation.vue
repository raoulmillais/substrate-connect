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
import { mapGetters, mapState } from 'vuex'
import type { RouterView, RouteParams } from 'vue-router';
import type { AppRouteNames } from '../router';

interface NavLink {
  name: AppRouteNames
  params?: Partial<RouteParams>
  title: string
  icon?: string
  display: 'all' | 'anonym' | 'authorized'
};

const links = [
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
    display: 'isConnected',
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
];

export default defineComponent({
  name: 'AppNavigation',
  computed: {
    ...mapState({
      items: state => {
        if (state.isConnected) {
          return links;
        }
        return links.filter(l => l.display === 'all');
      },
    }),
    ...mapGetters(['isConnected', 'accounts']),
  },
});
</script>
