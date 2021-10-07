<template>
  <div id="app">
    <x-header />
    <x-main />
    <x-footer />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import XHeader from "@/components/XHeader.vue";
import XMain from "@/components/XMain.vue";
import XFooter from "@/components/XFooter.vue";

export default Vue.extend({
  components: { XHeader, XMain, XFooter },
});
</script>

<style lang="scss">
body {
  overflow: hidden;
}

#app {
  min-height: 100vh;
  max-width: 500px;
  width: 90%;
  margin: 0 auto;

  @media screen and (min-width: 640px) {
    width: 100%;
  }
}
</style>
