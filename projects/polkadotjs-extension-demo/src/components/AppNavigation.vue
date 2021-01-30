<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <AppLink
        class="navbar-brand"
        name="home"
      >
        PolkadotJS Extension Demo
      </AppLink>

      <ul class="nav navbar-nav pull-xs-right">
        <li
          v-for="link in navLinks"
          :key="link.name"
          class="nav-item"
        >
          <AppLink
            class="nav-link"
            active-class="active"
            :name="link.name"
            :params="link.params"
          >
            <i
              v-if="link.icon"
              :class="link.icon"
            /> {{ link.title }}
          </AppLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import type { RouteParams } from 'vue-router';
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
    const username = computed(() => user.value?.username);
    const displayStatus = computed(() => accounts.length ? 'authorized' : 'anonym');
    const allNavLinks = computed<NavLink[]>(() => [
      {
        name: 'home',
        title: 'Home',
        display: 'all',
        icon: 'home',
      },
      {
        name: 'console',
        title: 'Console',
        display: 'all',
        icon: 'pulse',
      },
      /*
      {
        name: 'accounts',
        title: 'Accounts',
        display: 'authorized',
        icon: 'wallet',
      },
      {
        name: 'transactions',
        title: 'Transactions',
        display: 'authorized',
        icon: 'cash',
      },
      */
    ]);

    const navLinks = computed(() => allNavLinks.value.filter(
      l => l.display === displayStatus.value || l.display === 'all',
    ));
    return {
      navLinks,
    };
  },
});
</script>
