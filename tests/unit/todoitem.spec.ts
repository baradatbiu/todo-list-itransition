import { mount, createLocalVue, Wrapper } from "@vue/test-utils";
import TodoItem from "@/components/TodoItem.vue";
import MdList from "vue-material/dist/components/MdList";
import MdField from "vue-material/dist/components/MdField";
import MdCheckbox from "vue-material/dist/components/MdCheckbox";
import MdButton from "vue-material/dist/components/MdButton";
import MdMenu from "vue-material/dist/components/MdMenu";
import { Todo } from "@/types/todo";
import { getLocalDateString } from "@/utils/dateFormatter";

const localVue = createLocalVue();
localVue.use(MdField);
localVue.use(MdButton);
localVue.use(MdCheckbox);
localVue.use(MdMenu);
localVue.use(MdList);

const nowDate = Date.now();
const localDateString = getLocalDateString(nowDate);
const todo: Todo = {
  id: nowDate,
  date: localDateString,
  text: "new todo",
  completed: false,
};

describe("TodoItem.vue", () => {
  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    wrapper = mount(TodoItem, { localVue, propsData: { todo } });
  });

  it("submitting form make emit with expected parameters", async () => {
    await wrapper.setData({ editorMode: true });

    const checkInputValue = "updated todo";
    const expectedTodo: Todo = {
      ...todo,
      date: expect.stringContaining("(edited)"),
      text: checkInputValue,
    };

    await wrapper.find("input").setValue(checkInputValue);
    await wrapper.find("form").trigger("submit.prevent");

    expect(wrapper.emitted("updateTodo")).toMatchObject([[expectedTodo]]);
  });

  it("submitting form with empty input show error", async () => {
    await wrapper.setData({ editorMode: true });

    await wrapper.find("input").setValue("");
    await wrapper.find("form").trigger("submit.prevent");

    expect(wrapper.emitted("updateTodo")).toBeFalsy();
  });

  it("remove todo make emit with expected parameters", async () => {
    const menuButton = wrapper.find("button");
    await menuButton.trigger("click");

    const removeButton = wrapper.findAll(".md-menu-content button").at(1);
    await removeButton.trigger("click");

    expect(wrapper.emitted("removeTodo")).toMatchObject([[todo.id]]);
  });

  it("click to checkbox make emit with expected parameters", async () => {
    const checkboxWrapper = wrapper.find("input[type='checkbox']");
    const checkboxInput = checkboxWrapper.element as HTMLInputElement;

    checkboxInput.checked = true;
    await checkboxWrapper.trigger("click");
    await checkboxWrapper.trigger("change");

    expect(wrapper.emitted("changeTodoStatus")).toMatchObject([
      [{ id: todo.id, completed: !todo.completed }],
    ]);
  });

  it("changing todo.completed field changes data isCompleted", async () => {
    const initialProp = wrapper.props().todo.completed;
    await wrapper.setProps({ todo: { ...todo, completed: !initialProp } });

    expect(wrapper.vm.$data.isCompleted).toBe(!initialProp);
  });
});
