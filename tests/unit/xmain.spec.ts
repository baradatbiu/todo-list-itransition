import { shallowMount, createLocalVue } from "@vue/test-utils";
import XMain from "@/components/XMain.vue";
import MdList from "vue-material/dist/components/MdList";
import { Todo, TodoItems, TodoFilters } from "@/types/todo";

const localVue = createLocalVue();
localVue.use(MdList);

const todos: TodoItems = getTodoArray(5);

describe("XMain.vue", () => {
  const wrapper = shallowMount(XMain, {
    localVue,
  });

  wrapper.setData({ todoList: todos });

  const vmData = wrapper.vm.$data;

  it("display expected number completed todo-item elements", async () => {
    await wrapper.setData({ filter: TodoFilters.Completed });

    const todoElements = wrapper.findAll("todo-item-stub");

    expect(todoElements.length).toBe(
      vmData.todoList.filter(({ completed }: Todo) => completed).length
    );
  });

  it("display expected number active todo-item elements", async () => {
    await wrapper.setData({ filter: TodoFilters.Active });

    const todoElements = wrapper.findAll("todo-item-stub");

    expect(todoElements.length).toBe(
      vmData.todoList.filter(({ completed }: Todo) => !completed).length
    );
  });

  it("display expected number all todo-item elements", async () => {
    await wrapper.setData({ filter: TodoFilters.All });

    const todoElements = wrapper.findAll("todo-item-stub");

    expect(todoElements.length).toBe(vmData.todoList.length);
  });

  it("call child component emit 'addTodo' adding new todo to first place", async () => {
    const lastTodo = todos[todos.length - 1];
    const newTodo = { ...lastTodo, id: lastTodo.id + 1 };

    const todoAdd = wrapper.find("todo-add-stub");
    await todoAdd.vm.$emit("addTodo", newTodo);

    expect(vmData.todoList[0]).toBe(newTodo);
  });

  it("call child component emit 'removeTodo' remove expected todo", async () => {
    const removeTodoId = todos[0].id;

    const todoItem = wrapper.find("todo-item-stub");
    await todoItem.vm.$emit("removeTodo", removeTodoId);

    expect(
      vmData.todoList.some(({ id }: Todo) => id === removeTodoId)
    ).toBeFalsy();
  });

  it("call child component emit 'updateTodo' update expected todo", async () => {
    const lastTodo = todos[todos.length - 1];
    const updatedTodo = { ...lastTodo, text: "updated todo" };

    const todoItem = wrapper.find("todo-item-stub");
    await todoItem.vm.$emit("updateTodo", updatedTodo);

    expect(vmData.todoList[0]).toBe(updatedTodo);
  });

  it("call child component emit 'changeTodoStatus' update expected todo", async () => {
    const todoCheckIdx = 2;
    const { id, completed } = todos[todoCheckIdx];

    const todoItem = wrapper.find("todo-item-stub");
    await todoItem.vm.$emit("changeTodoStatus", { id, completed: !completed });

    expect(vmData.todoList[todoCheckIdx]).toMatchObject({
      completed: !completed,
    });
  });

  it("call child component emit 'changeStatusAllTodo' change all todo status", async () => {
    const checkStatus = true;

    const todoItem = wrapper.find("todo-settings-stub");
    await todoItem.vm.$emit("changeStatusAllTodo", checkStatus);

    expect(
      vmData.todoList.every(({ completed }: Todo) => completed === checkStatus)
    ).toBeTruthy();
  });
});

function getTodoArray(length: number): TodoItems {
  const todo: Todo = {
    id: 0,
    date: "01.01.2021, 00:00:00",
    text: "todo",
    completed: false,
  };

  const todos = [];

  for (let i = 0; i < length; i++) {
    const todoItem = { ...todo };

    if (i % 2 === 0) todoItem.completed = true;

    todos.push({ ...todoItem, id: i });
  }

  return todos;
}
