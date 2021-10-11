import { mount, createLocalVue } from "@vue/test-utils";
import TodoAdd from "@/components/TodoAdd.vue";
import MdField from "vue-material/dist/components/MdField";
import { Todo } from "@/types/todo";

const localVue = createLocalVue();
localVue.use(MdField);

describe("TodoAdd.vue", () => {
  const wrapper = mount(TodoAdd, { localVue });

  it("include form with input", () => {
    expect(wrapper.find("form input").exists()).toBeTruthy();
  });

  it("submitting form with empty input value not make emit", async () => {
    await wrapper.find("input").setValue("");
    await wrapper.find("form").trigger("submit.prevent");

    expect(wrapper.emitted("addTodo")).toBeFalsy();
  });

  it("submitting form with input value make emit with expected parameters", async () => {
    const checkInputValue = "new todo";
    const expectedTodo: Todo = {
      id: expect.any(Number),
      date: expect.any(String),
      text: checkInputValue,
      completed: false,
    };

    await wrapper.find("input").setValue(checkInputValue);
    await wrapper.find("form").trigger("submit.prevent");

    expect(wrapper.emitted("addTodo")).toMatchObject([[expectedTodo]]);
  });
});
