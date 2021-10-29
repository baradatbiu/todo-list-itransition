<template>
  <form @submit.prevent="addTodo">
    <md-field>
      <label>New to-do</label>
      <md-input
        v-model.trim="todoText"
        placeholder="Write here"
        maxlength="70"
      />
    </md-field>
  </form>
</template>

<script lang="ts">
import Vue from "vue";
import { Todo } from "@/types/todo";
import { getLocalDateString } from "@/utils/dateFormatter";

export default Vue.extend({
  data() {
    return {
      todoText: "" as Todo["text"],
    };
  },
  methods: {
    addTodo() {
      if (this.todoText === "") return;

      const nowDate = Date.now();
      const localDateString = getLocalDateString(nowDate);

      const newTodo: Todo = {
        id: nowDate,
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
