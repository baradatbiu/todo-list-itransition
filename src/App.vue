<template>
  <div id="app">
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: "Hello",
      };
    },
  };
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
