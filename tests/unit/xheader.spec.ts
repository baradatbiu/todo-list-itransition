import { mount } from '@vue/test-utils'
import XHeader from '@/components/XHeader.vue'

describe('XHeader.vue', () => {
  const wrapper = mount(XHeader)

  it('display corrected text', () => {
    expect(wrapper.html()).toContain('To-Do List')
  })
})