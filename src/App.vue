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
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 10px;

  @media screen and (min-width: 640px) {
    padding: 0;
  }
}

p,
h1 {
  margin: 0;
}
</style>
