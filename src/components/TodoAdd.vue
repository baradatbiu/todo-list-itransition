<template>
  <form @submit.prevent="addTodo">
    <md-field>
      <label>New to-do</label>
      <md-input
        v-model="todoText"
        placeholder="Write here"
        maxlength="70"
      ></md-input>
    </md-field>
  </form>
</template>

<script lang="ts">
import Vue from "vue";
import { Todo } from "@/types/todo";

export default Vue.extend({
  data() {
    return {
      todoText: "",
    };
  },
  methods: {
    addTodo() {
      if (this.todoText === "") return;

      const localDateString = new Date().toLocaleString();

      const newTodo: Todo = {
        date: localDateString,
        text: this.todoText,
        completed: false,
      };

      this.$emit("addTodo", newTodo);

      this.todoText = "";
    },
  },
});
</script>
