import { mount, createLocalVue, Wrapper } from "@vue/test-utils";
import TodoSettings from "@/components/TodoSettings.vue";
import MdRadio from "vue-material/dist/components/MdRadio";
import MdCheckbox from "vue-material/dist/components/MdCheckbox";
import { TodoStatuses } from "@/types/todo";

const filters = Object.keys(TodoStatuses);

const localVue = createLocalVue();
localVue.use(MdRadio);
localVue.use(MdCheckbox);

describe("TodoSettings.vue", () => {
  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    wrapper = mount(TodoSettings, {
      localVue,
      propsData: { allCompleted: false },
    });
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

    expect(checkboxInput.exists()).toBeTruthy();
  });

  it("click to checkbox make emit with expected parameters", async () => {
    const checkStatus = !wrapper.props("allCompleted");
    const checkboxWrapper = wrapper.find("input[type='checkbox']");
    const checkboxInput = checkboxWrapper.element as HTMLInputElement;

    await checkboxWrapper.trigger("click");
    await checkboxWrapper.trigger("change");

    expect(checkboxInput.checked).toBe(checkStatus);

    expect(wrapper.emitted("changeStatusAllTodo")).toMatchObject([
      [checkStatus],
    ]);
  });

  it("include expected number radio inputs", () => {
    const radios = wrapper.findAll("input[type='radio']");

    expect(radios.length).toBe(filters.length);
  });

  it("change radio input value make emit with expected parameters", async () => {
    const checkedFilterValue = TodoStatuses.Completed;
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
