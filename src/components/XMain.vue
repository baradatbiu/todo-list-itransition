<template>
  <main class="main">
    <todo-add @addTodo="onAddTodo" />
    <div class="todo-list">
      <md-list v-show="filteredTodos.length" class="md-double-line">
        <todo-item
          v-for="todo in filteredTodos"
          :key="todo.id"
          :todo="todo"
          @changeTodoStatus="onChangeTodoStatus"
          @updateTodo="onUpdateTodo"
          @removeTodo="onRemoveTodo"
        />
      </md-list>
    </div>
    <todo-settings
      v-show="todoList.length"
      :all-completed="allCompleted"
      @changeStatusAllTodo="onChangeStatusAllTodo"
      @changeTodoFilter="filter = $event"
    />
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import TodoAdd from "@/components/TodoAdd.vue";
import TodoItem from "@/components/TodoItem.vue";
import TodoSettings from "./TodoSettings.vue";

import { getTodos, setTodos } from "@/storage/todoStorage";
import { Todo, TodoStatuses, TodoItems } from "@/types/todo";

export default Vue.extend({
  components: { TodoAdd, TodoItem, TodoSettings },
  data() {
    return {
      todoList: [] as TodoItems,
      filter: TodoStatuses.All,
    };
  },
  computed: {
    allCompleted(): boolean {
      return this.todoList.every(({ completed }) => completed);
    },
    filteredTodos(): TodoItems {
      switch (this.filter) {
        case TodoStatuses.Completed:
          return this.todoList.filter(({ completed }) => completed);

        case TodoStatuses.Active:
          return this.todoList.filter(({ completed }) => !completed);

        default:
          return this.todoList;
      }
    },
  },
  watch: {
    todoList: {
      handler(todos) {
        setTodos(todos);
      },
      deep: true,
    },
  },
  mounted() {
    this.todoList = getTodos();
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
