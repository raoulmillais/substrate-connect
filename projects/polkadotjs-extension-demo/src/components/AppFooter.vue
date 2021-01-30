<template>
  <footer>
    <div class="container">
      <AppLink
        name="home"
        class="logo-font"
      >
        conduit
      </AppLink>
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
