<template>
  <md-list-item>
    <form v-if="editorMode" @submit.prevent="updateTodo">
      <md-field md-clearable>
        <label>Change to-do</label>
        <md-input v-model="todoText" maxlength="70"></md-input>
      </md-field>
    </form>
    <template v-else>
      <md-checkbox v-model="isCompleted" />
      <div class="md-list-item-text">
        <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
        <time>{{ todo.date }}</time>
      </div>
      <div class="todo-btns">
        <md-button
          v-show="!todo.completed"
          class="md-icon-button md-list-action"
          @click.stop="editorMode = true"
        >
          <md-icon :md-src="require('@/icons/edit.svg')"></md-icon>
        </md-button>
        <md-button
          class="md-icon-button md-list-action"
          @click.stop="removeTodo"
        >
          <md-icon :md-src="require('@/icons/delete.svg')"></md-icon>
        </md-button>
      </div>
    </template>
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
      editorMode: false,
    };
  },
  watch: {
    isCompleted(completed) {
      this.$emit("changeTodoStatus", { id: this.todo.id, completed });
    },
  },
  methods: {
    updateTodo() {
      const localDateString = getLocalDateString(Date.now());

      const updatedTodo: Todo = {
        ...this.todo,
        date: `${localDateString} (edited)`,
        text: this.todoText,
      };

      this.$emit("updateTodo", updatedTodo);

      this.editorMode = false;
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

form {
  width: 100%;
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
