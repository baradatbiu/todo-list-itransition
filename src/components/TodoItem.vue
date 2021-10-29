<template>
  <md-list-item>
    <form v-if="editorMode" @submit.prevent="updateTodo">
      <md-field :class="{ 'md-invalid': !validatedTodo }" md-clearable>
        <label>Change to-do</label>
        <md-input v-model.trim="todoText" maxlength="70" required />
        <span class="md-error">This is a required field</span>
      </md-field>
    </form>
    <div v-else class="todo-item">
      <md-checkbox v-model="isCompleted" />
      <div class="md-list-item-text" :class="{ completed: todo.completed }">
        <span>{{ todo.text }}</span>
        <time>{{ todo.date }}</time>
      </div>
      <md-menu class="todo-btns" md-direction="bottom-end">
        <md-button class="md-icon-button" md-menu-trigger @click.stop>
          <md-icon :md-src="require('@/icons/more-vert.svg')" />
        </md-button>
        <md-menu-content>
          <md-menu-item v-show="!todo.completed" @click="showEditForm">
            <span>Edit</span>
            <md-icon :md-src="require('@/icons/edit.svg')" />
          </md-menu-item>
          <md-menu-item @click="removeTodo">
            <span>Delete</span>
            <md-icon :md-src="require('@/icons/delete.svg')" />
          </md-menu-item>
        </md-menu-content>
      </md-menu>
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
      todoText: "",
      editorMode: false,
    };
  },
  computed: {
    validatedTodo(): boolean {
      return Boolean(this.todoText);
    },
  },
  watch: {
    "todo.completed"(completed) {
      this.isCompleted = completed;
    },
    isCompleted(completed) {
      this.$emit("changeTodoStatus", { id: this.todo.id, completed });
    },
  },
  methods: {
    showEditForm() {
      this.todoText = this.todo.text;
      this.editorMode = true;
    },
    updateTodo() {
      if (!this.validatedTodo) return;

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

.todo-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.todo-btns {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}

.md-list-item:not(:last-child) {
  border-bottom: 1px solid #eeeeee;
}

.md-list-item-text {
  transition: all 0.3s;

  &.completed {
    opacity: 0.4;

    span {
      text-decoration: line-through;
    }
  }

  time {
    font-size: 0.7em;
  }
}

.md-list-item-content > .md-checkbox:first-child {
  margin-right: 16px;
}
</style>
