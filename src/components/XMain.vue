<template>
  <main class="main">
    <todo-add @addTodo="onAddTodo" />
    <div class="todo-list">
      <md-list v-show="todoList.length" class="md-double-line">
        <todo-item
          v-for="todo in todoList"
          :key="todo.date"
          :todo="todo"
          @updateTodo="onUpdateTodo"
          @removeTodo="onRemoveTodo"
        ></todo-item>
      </md-list>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import TodoAdd from "@/components/TodoAdd.vue";
import TodoItem from "@/components/TodoItem.vue";

import { Todo, TodoItems } from "@/types/todo";

export default Vue.extend({
  components: { TodoAdd, TodoItem },
  data() {
    return {
      todoList: [] as TodoItems,
    };
  },
  methods: {
    onAddTodo(todo: Todo) {
      this.todoList.unshift(todo);
    },
    onUpdateTodo(todo: Todo) {
      console.log(todo);
    },
    onRemoveTodo(removeTodo: Todo) {
      this.todoList = this.todoList.filter(
        (todo) => todo.date !== removeTodo.date
      );
    },
  },
});
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
}

.todo-list {
  min-height: 200px;
  padding: 15px 0;
}

.md-list-item:hover {
  .todo-list__btns {
    opacity: 1;
    pointer-events: all;
  }
}

.todo-list__btns {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}

.md-list-item:not(:last-child) {
  border-bottom: 1px solid #eeeeee;
}

.md-list-item-text time {
  font-size: 0.7em;
}
</style>
