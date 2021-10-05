<template>
  <form class="todo-add-component" @submit.prevent="addTodo">
    <md-field>
      <label>New to-do</label>
      <md-input
        v-model="newTodo"
        placeholder="Write here"
        maxlength="70"
      ></md-input>
    </md-field>
  </form>
</template>

<script lang="ts">
import Vue from "vue";
import { Todo } from "@/types/todo";

export default Vue.extend({
  data() {
    return {
      newTodo: "",
    };
  },
  methods: {
    addTodo() {
      if (this.newTodo === "") return;

      const nowDate = new Date();

      const todo: Todo = {
        date: nowDate.toLocaleString(),
        text: this.newTodo,
      };

      this.$emit("addTodo", todo);

      this.newTodo = "";
    },
  },
});
</script>

<style lang="scss" scoped>
.todo-add-component {
  margin-bottom: 30px;
}
</style>
