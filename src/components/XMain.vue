<template>
  <main class="main">
    <todo-add @addTodo="onAddTodo" />
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
    onAddTodo(todo: Todo) {
      this.todoList.push(todo);
    },
  },
});
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
}
</style>
