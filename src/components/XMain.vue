<template>
  <main class="main-component">
    <todo-add @addTodo="addTodo" />
    <br />
    <pre>{{ todoList }}</pre>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import TodoAdd from "@/components/TodoAdd.vue";
import { Todo, TodoList } from "@/types/todo";

export default Vue.extend({
  components: { TodoAdd },
  data() {
    return {
      todoList: [] as TodoList,
    };
  },
  methods: {
    addTodo(todo: Todo) {
      this.todoList.push(todo);
    },
  },
});
</script>

<style lang="scss" scoped>
.main-component {
  min-height: 100px;
  max-width: 500px;
  width: 100%;
  margin-bottom: 30px;
}
</style>
