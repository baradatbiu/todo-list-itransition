<template>
  <md-list-item>
    <form v-if="editorMode" @submit.prevent="updateTodo">
      <md-field md-clearable>
        <label>Change to-do</label>
        <md-input v-model.trim="todoText" maxlength="70"></md-input>
      </md-field>
    </form>
    <template v-else>
      <md-checkbox v-model="isCompleted" />
      <div class="md-list-item-text">
        <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
        <time>{{ todo.date }}</time>
      </div>
      <md-menu class="todo-btns" md-direction="bottom-end">
        <md-button class="md-icon-button" md-menu-trigger @click.stop>
          <md-icon :md-src="require('@/icons/more-vert.svg')"></md-icon>
        </md-button>
        <md-menu-content>
          <md-menu-item v-show="!todo.completed" @click="showEditForm">
            <span>Edit</span>
            <md-icon :md-src="require('@/icons/edit.svg')"></md-icon>
          </md-menu-item>
          <md-menu-item @click="removeTodo">
            <span>Delete</span>
            <md-icon :md-src="require('@/icons/delete.svg')"></md-icon>
          </md-menu-item>
        </md-menu-content>
      </md-menu>
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
    showEditForm() {
      this.editorMode = true;
    },
    updateTodo() {
      const localDateString = getLocalDateString(Date.now());

      const updatedTodo: Todo = {
        ...this.todo,
        date: `${localDateString} (edited)`,
        text: this.todoText || this.todo.text,
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
