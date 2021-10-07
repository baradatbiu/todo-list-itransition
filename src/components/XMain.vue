<template>
  <main class="main">
    <todo-add @addTodo="onAddTodo" />
    <div class="todo-list">
      <md-list v-show="todoList.length" class="md-double-line">
        <todo-item
          v-for="todo in todoList"
          :key="todo.id"
          :todo="todo"
          @changeTodoStatus="onChangeTodoStatus"
          @updateTodo="onUpdateTodo"
          @removeTodo="onRemoveTodo"
        ></todo-item>
      </md-list>
    </div>
    <todo-settings
      v-show="todoList.length"
      :all-completed="allCompleted"
      @changeStatusAllTodo="onChangeStatusAllTodo"
    />
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import TodoAdd from "@/components/TodoAdd.vue";
import TodoItem from "@/components/TodoItem.vue";
import TodoSettings from "./TodoSettings.vue";

import { Todo, TodoItems } from "@/types/todo";

export default Vue.extend({
  components: { TodoAdd, TodoItem, TodoSettings },
  data() {
    return {
      todoList: [] as TodoItems,
    };
  },
  computed: {
    allCompleted(): boolean {
      return this.todoList.every(({ completed }) => completed);
    },
  },
  methods: {
    onAddTodo(todo: Todo) {
      this.todoList.unshift(todo);
    },
    onChangeTodoStatus({ id, completed }: Todo) {
      const todo = this.todoList.find((todo) => todo.id === id);

      if (todo) todo.completed = completed;
    },
    onChangeStatusAllTodo(status: boolean) {
      this.todoList = this.todoList.map((todo) => ({
        ...todo,
        completed: status,
      }));
    },
    onUpdateTodo(todo: Todo) {
      this.todoList = this.todoList.filter(({ id }) => id !== todo.id);

      this.todoList.unshift(todo);
    },
    onRemoveTodo(removeTodoId: Todo["id"]) {
      this.todoList = this.todoList.filter(({ id }) => id !== removeTodoId);
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
  min-height: 120px;
  padding: 15px 0;
}
</style>
