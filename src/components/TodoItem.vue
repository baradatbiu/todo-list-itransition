<template>
  <md-list-item>
    <md-checkbox v-model="isCompleted" />
    <div class="md-list-item-text">
      <span>{{ todo.text }}</span>
      <time>{{ todo.date }}</time>
    </div>
    <div v-show="!todo.completed" class="todo-list__btns">
      <md-button class="md-icon-button md-list-action" @click.stop="editTodo">
        <md-icon :md-src="require('@/icons/edit.svg')"></md-icon>
      </md-button>
      <md-button class="md-icon-button md-list-action" @click.stop="removeTodo">
        <md-icon :md-src="require('@/icons/delete.svg')"></md-icon>
      </md-button>
    </div>
  </md-list-item>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Todo } from "@/types/todo";

export default Vue.extend({
  props: {
    todo: {
      type: Object as PropType<Todo>,
      required: true,
    },
  },
  data() {
    return {
      isCompleted: this.todo.completed,
      todoText: this.todo.text,
    };
  },
  watch: {
    isComleted(isCompleted) {
      this.$emit("updateTodo", { ...this.todo, completed: isCompleted });
    },
  },
  methods: {
    editTodo() {
      const localDateString = new Date().toLocaleString();

      const updatedTodo: Todo = {
        ...this.todo,
        date: localDateString,
        text: this.todoText,
      };

      this.$emit("updateTodo", updatedTodo);
    },
    removeTodo() {
      this.$emit("removeTodo", this.todo);
    },
  },
});
</script>

//
<style lang="scss" scoped>
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
