<template>
  <div class="filter">
    <md-checkbox
      v-model="allTodoStatus"
      @change="$emit('changeStatusAllTodo', allTodoStatus)"
    />
    <div>
      <md-radio
        v-for="value in filters"
        :key="value"
        v-model="filter"
        :value="value"
        @change="$emit('changeTodoFilter', filter)"
        >{{ value }}</md-radio
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { TodoStatuses } from "@/types/todo";

export default Vue.extend({
  props: {
    allCompleted: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      filters: TodoStatuses,
      filter: TodoStatuses.All,
      allTodoStatus: this.allCompleted,
    };
  },
  watch: {
    allCompleted(status) {
      this.allTodoStatus = status;
    },
  },
});
</script>

<style lang="scss" scoped>
.filter {
  padding-left: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
