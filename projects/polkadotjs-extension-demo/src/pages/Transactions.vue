<template>
  <div class="home-page p-grid">
    <div class="p-col">

      <div v-for="account in accounts" class="p-row p-m-2">
        <Card>
          <template #title>
            Account Transactions
          </template>
          <template #content>
            Account: {{ $route.params.account }}
          </template>
        </Card>
      </div>


    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import { routerPush } from '../router';

export default defineComponent({
  name: 'Transactions',
  computed: mapGetters(['accounts']),
});
</script>

