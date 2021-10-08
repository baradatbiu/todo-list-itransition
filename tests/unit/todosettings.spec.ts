import { mount, createLocalVue } from "@vue/test-utils";
import TodoSettings from "@/components/TodoSettings.vue";
import MdRadio from "vue-material/dist/components/MdRadio";
import MdCheckbox from "vue-material/dist/components/MdCheckbox";
import { TodoFilters } from "@/types/todo";

const filters = Object.keys(TodoFilters);

const localVue = createLocalVue();
localVue.use(MdRadio);
localVue.use(MdCheckbox);

describe("TodoSettings.vue", () => {
  const wrapper = mount(TodoSettings, {
    localVue,
    propsData: { allCompleted: false },
  });

  it("changing prop value allCompleted changes allTodoStatus data filed", async () => {
    const initialPropValue = wrapper.props("allCompleted");
    const initialDataValue = wrapper.vm.$data.allTodoStatus;

    expect(initialDataValue).toBe(initialPropValue);

    await wrapper.setProps({ allCompleted: !initialPropValue });

    const endDataValue = wrapper.vm.$data.allTodoStatus;

    expect(endDataValue).toBe(!initialPropValue);
  });

  it("include checkbox input", () => {
    const checkboxInput = wrapper.find("input[type='checkbox']");

    expect(checkboxInput.exists()).toBe(true);
  });

  it("click to checkbox make emit with expected parameters", async () => {
    const checkboxWrapper = wrapper.find("input[type='checkbox']");
    const checkboxInput = checkboxWrapper.element as HTMLInputElement;
    const initialCheckboxStatus = wrapper.props("allCompleted");

    checkboxInput.checked = initialCheckboxStatus;
    await checkboxWrapper.trigger("click");
    await checkboxWrapper.trigger("change");

    expect(checkboxInput.checked).toBe(!initialCheckboxStatus);

    expect(wrapper.emitted("changeStatusAllTodo")).toMatchObject([
      [!initialCheckboxStatus],
    ]);
  });

  it("include expected number radio inputs", () => {
    const radios = wrapper.findAll("input[type='radio']");

    expect(radios.length).toBe(filters.length);
  });

  it("change radio input value make emit with expected parameters", async () => {
    const checkedFilterValue = TodoFilters.Completed;
    const radioWrapper = wrapper.find(
      `input[type='radio'][value=${checkedFilterValue}]`
    );
    const radioInput = radioWrapper.element as HTMLInputElement;

    radioInput.checked = true;
    await radioWrapper.trigger("click");
    await radioWrapper.trigger("change");

    expect(wrapper.vm.$data.filter).toBe(checkedFilterValue);

    expect(wrapper.emitted("changeTodoFilter")).toMatchObject([
      [checkedFilterValue],
    ]);
  });
});
