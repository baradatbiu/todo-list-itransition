import { TodoItems } from "./../types/todo";

const KEY = "TODOS_IT";

export function getTodos(): TodoItems {
  const todos = JSON.parse(localStorage.getItem(KEY) || "[]");

  return todos;
}

export function setTodos(todos: TodoItems): void {
  localStorage.setItem(KEY, JSON.stringify(todos));
}
