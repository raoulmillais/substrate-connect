<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">
          Polkadot JS Extension Demo
        </h1>
        <p>A place to monitor your westend accounts.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <p>
            This is a demo app using VueJS that interacts with PolkadotJS extension
            and the Westend blockchain allowing you to view transaction histories.
          </p>
          <ul class="error-messages">
            <li v-for="error in errors">
              {{ error }}
            </li>
          </ul>
          <form @submit.prevent="connect">
            <button class="btn btn-lg btn-primary pull-xs-right" type="submit">
                Connect to PolkadotJS Extension
            </button>
          </form>
        </div>
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

