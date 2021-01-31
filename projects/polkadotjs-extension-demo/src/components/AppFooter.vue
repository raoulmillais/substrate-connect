<template>
  <footer>
    <div class="p-col p-component">
      <router-link to="/">PolkadotJS Extension Demo</router-link>
      <span class="attribution">
        A substrate browser demo by  <a href="https://parity.io">Parity</a>. Code &amp; design licensed under Apache 2.
      </span>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'AppFooter',
});
</script>
