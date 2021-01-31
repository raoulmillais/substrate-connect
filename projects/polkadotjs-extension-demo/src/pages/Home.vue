<template>
  <div class="home-page p-grid">
    <div class="p-col">

      <div class="p-row p-m-2">
        <Card>
          <template #title>
            Introduction
          </template>
          <template #content>
            This is a demo app using VueJS that interacts with PolkadotJS extension
            and the Westend blockchain allowing you to view transaction histories.
          </template>
        </Card>
      </div>

      <div class="p-row p-m-2">
        <Card>
          <template #title>
            Allow acces to the PolkadotJS extension
          </template>
          <template #content>
            <Button v-if="!isConnected" class="p-button-text p-button-raised" label="Connect" @click="connectExtension" />
            <p v-else>There are {{accounts.length}} accounts</p>
            <!--
            <ul>
              <li v-for="error in errors">
                /* TODO */
              </li>
            </ul>
            -->
          </template>
        </Card>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { enable } from '../services/extension';
import { updateAccounts } from '../store/accounts';
import { routerPush } from '../router';

export default defineComponent({
  name: 'HomePage',
  computed: mapGetters(['isConnected', 'accounts']),
  methods: mapActions(['connectExtension']),
});
</script>

