<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <h3>{{ defineAutorName }}</h3>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      title: "Hello",
      author: "Dima",
    };
  },
  computed: {
    defineAutorName(): string {
      return this.author ? this.author : "unknown";
    },
  },
  methods: {
    changeTitle() {
      this.title = "Fuck";
    },
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
