import { shallowMount } from '@vue/test-utils'
import Facade from '@/views/Facade.vue'

describe('Facade.vue', () => {
  it('/login-handler로 향하는 링크가 있음', () => {
    const wrapper = shallowMount(Facade)
    expect(wrapper.contains('a.is-login')).toBe(true)
  })
})
