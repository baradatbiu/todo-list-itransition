export type Todo = {
  id: number;
  date: string;
  text: string;
  completed: boolean;
};

export type TodoItems = Todo[];

export enum TodoFilters {
  All = "all",
  Completed = "completed",
  Active = "active",
}
