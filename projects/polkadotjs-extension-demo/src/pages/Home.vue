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
            <Button class="p-button-text p-button-raised" label="Connect" @click="connect" /> <ul class="error-messages">
              <li v-for="error in errors">
                {{ error }}
              </li>
            </ul>
          </template>
        </Card>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { enable } from '../services/extension';
import { updateAccounts } from '../store/accounts';
import { routerPush } from '../router';

export default defineComponent({
  name: 'HomePage',
  components: { },
  setup() {
    const errors = ref<string[]>([]);

    const connect = async () => {
      const result = await enable();

      if (result.ok) {
        updateAccounts(result.value);
        await routerPush('home');
      } else {
        errors.value = ['No extension installed or was not authorised by user.'];
      }
    };

    return {
      connect,
      errors,
    };
  }
})
</script>

