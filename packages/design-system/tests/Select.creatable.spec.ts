import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Select from '../src/components/form/Select.vue'

describe('Select creatable', () => {
  it('shows modelValue even when it is not in options', () => {
    const wrapper = mount(Select, {
      props: {
        options: [{ label: 'Finance', value: 'Finance' }],
        modelValue: 'Custom Category',
        creatable: true,
      },
    })
    expect(wrapper.text()).toContain('Custom Category')
    wrapper.unmount()
  })

  it('emits create when choosing Create option', async () => {
    const wrapper = mount(Select, {
      props: {
        options: [{ label: 'Finance', value: 'Finance' }],
        searchable: true,
        creatable: true,
        modelValue: '',
      },
      attachTo: document.body,
    })

    await wrapper.find('[role="combobox"]').trigger('click')
    await wrapper.vm.$nextTick()

    const input = document.body.querySelector('input') as HTMLInputElement
    expect(input).toBeTruthy()
    input.value = 'Payments'
    input.dispatchEvent(new Event('input', { bubbles: true }))
    await wrapper.vm.$nextTick()

    const createBtn = Array.from(document.body.querySelectorAll('button')).find((btn) =>
      btn.textContent?.includes('Create'),
    )
    expect(createBtn).toBeTruthy()
    createBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await wrapper.vm.$nextTick()

    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted?.at(-1)?.[0]).toBe('Payments')
    wrapper.unmount()
  })
})

describe('Select open behavior', () => {
  it('stays open after trigger click (no same-click close race)', async () => {
    const wrapper = mount(Select, {
      props: {
        options: [
          { label: 'Development', value: 'dev' },
          { label: 'Production', value: 'prod' },
        ],
        searchable: false,
        modelValue: '',
      },
      attachTo: document.body,
    })

    const trigger = wrapper.find('[role="combobox"]')
    await trigger.trigger('click')
    await wrapper.vm.$nextTick()

    expect(trigger.attributes('aria-expanded')).toBe('true')
    expect(document.body.querySelector('[role="listbox"]')).toBeTruthy()

    wrapper.unmount()
  })

  it('selects an option and emits update:modelValue', async () => {
    const wrapper = mount(Select, {
      props: {
        options: [
          { label: 'Development', value: 'dev' },
          { label: 'Production', value: 'prod' },
        ],
        searchable: false,
        modelValue: '',
      },
      attachTo: document.body,
    })

    await wrapper.find('[role="combobox"]').trigger('click')
    await wrapper.vm.$nextTick()

    const option = Array.from(document.body.querySelectorAll('[role="option"]')).find((btn) =>
      btn.textContent?.includes('Production'),
    )
    expect(option).toBeTruthy()
    option?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toBe('prod')
    wrapper.unmount()
  })

  it('opens upward when there is not enough space below the trigger', async () => {
    const wrapper = mount(Select, {
      props: {
        options: [
          { label: 'Passthrough', value: 'passthrough' },
          { label: 'OAuth 2.0 / JWT', value: 'oauth2' },
          { label: 'API Key', value: 'api-key' },
          { label: 'Mutual TLS (mTLS)', value: 'mtls' },
        ],
        searchable: false,
        modelValue: 'oauth2',
      },
      attachTo: document.body,
    })

    const trigger = wrapper.find('[role="combobox"]')
    const triggerEl = trigger.element as HTMLElement
    triggerEl.getBoundingClientRect = () =>
      ({
        top: 700,
        bottom: 740,
        left: 40,
        right: 340,
        width: 300,
        height: 40,
        x: 40,
        y: 700,
        toJSON: () => ({}),
      }) as DOMRect

    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 800 })
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1280 })

    await trigger.trigger('click')
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => requestAnimationFrame(() => resolve(undefined)))

    const panel = document.body.querySelector('[role="presentation"]') as HTMLElement | null
    expect(panel).toBeTruthy()
    const top = Number.parseFloat(panel!.style.top)
    // Trigger top is 700; opening upward places the panel above it.
    expect(top).toBeLessThan(700)

    wrapper.unmount()
  })
})
