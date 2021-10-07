<template>
  <div class="filter">
    <md-checkbox v-model="allTodoStatus" @change="changeStatusAllTodo" />
    <div class="filter__radio">
      <md-radio v-model="filter" value="all">All</md-radio>
      <md-radio v-model="filter" value="completed">Completed</md-radio>
      <md-radio v-model="filter" value="active">Active</md-radio>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    allCompleted: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      filter: "all",
      allTodoStatus: this.allCompleted,
    };
  },
  watch: {
    allCompleted(status) {
      this.allTodoStatus = status;
    },
  },
  methods: {
    changeStatusAllTodo() {
      this.$emit("changeStatusAllTodo", this.allTodoStatus);
    },
  },
});
</script>

<style lang="scss" scoped>
.filter {
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
