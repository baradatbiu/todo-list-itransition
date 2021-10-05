import { mount } from '@vue/test-utils'
import XFooter from '@/components/XFooter.vue'

describe('XFooter.vue', () => {
  const wrapper = mount(XFooter)

  it('display corrected text', () => {
    expect(wrapper.html()).toContain('Made by Kharlamov')
  })
})