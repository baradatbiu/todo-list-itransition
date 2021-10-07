<template>
  <md-list-item>
    <md-checkbox v-model="isCompleted" />
    <div class="md-list-item-text">
      <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
      <time>{{ todo.date }}</time>
    </div>
    <div class="todo-btns">
      <md-button
        v-show="!todo.completed"
        class="md-icon-button md-list-action"
        @click.stop="updateTodo"
      >
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
import { getLocalDateString } from "@/utils/dateFormatter";

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
    isCompleted(completed) {
      this.$emit("changeTodoStatus", { id: this.todo.id, completed });
    },
  },
  methods: {
    updateTodo() {
      const updatedTodo: Todo = {
        ...this.todo,
        date: getLocalDateString(Date.now()),
        text: this.todoText,
      };

      this.$emit("updateTodo", updatedTodo);
    },
    removeTodo() {
      this.$emit("removeTodo", this.todo.id);
    },
  },
});
</script>

//
<style lang="scss" scoped>
.md-list-item:hover {
  .todo-btns {
    opacity: 1;
    pointer-events: all;
  }
}

.todo-btns {
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

.md-list-item-text .completed {
  opacity: 0.5;
  text-decoration: line-through;
}
</style>
