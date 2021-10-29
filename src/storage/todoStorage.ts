import { TodoItems } from "./../types/todo";

const KEY = "TODOS_IT";

export function getTodos(): TodoItems {
  const defaultValue = [] as TodoItems;
  const value = localStorage.getItem(KEY);

  return value ? JSON.parse(value) : defaultValue;
}

export function setTodos(todos: TodoItems): void {
  localStorage.setItem(KEY, JSON.stringify(todos));
}
