import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Select from '../src/components/form/Select.vue'

async function openAndGetSearchInput(
  wrapper: ReturnType<typeof mount>,
): Promise<HTMLInputElement> {
  const trigger = wrapper.find('[role="combobox"]')
  if (trigger.attributes('aria-expanded') !== 'true') {
    await trigger.trigger('click')
    await wrapper.vm.$nextTick()
  }
  const input = document.body.querySelector('input') as HTMLInputElement | null
  expect(input).toBeTruthy()
  return input!
}

async function typeInSearch(wrapper: ReturnType<typeof mount>, text: string): Promise<void> {
  const input = await openAndGetSearchInput(wrapper)
  input.value = text
  input.dispatchEvent(new Event('input', { bubbles: true }))
  await wrapper.vm.$nextTick()
}

describe('Select serverSearch', () => {
  it('emits empty search below minSearchChars and the term at threshold', async () => {
    const wrapper = mount(Select, {
      props: {
        options: [{ label: 'Alpha', value: 'a' }],
        searchable: true,
        serverSearch: true,
        minSearchChars: 3,
        modelValue: '',
      },
      attachTo: document.body,
    })

    await typeInSearch(wrapper, 'ab')
    const below = wrapper.emitted('search') ?? []
    expect(below.at(-1)?.[0]).toBe('')

    await typeInSearch(wrapper, 'abc')
    const atMin = wrapper.emitted('search') ?? []
    expect(atMin.at(-1)?.[0]).toBe('abc')

    wrapper.unmount()
  })

  it('does not filter options locally when serverSearch is on', async () => {
    const wrapper = mount(Select, {
      props: {
        options: [
          { label: 'Payments', value: 'pay' },
          { label: 'Billing', value: 'bill' },
        ],
        searchable: true,
        serverSearch: true,
        minSearchChars: 0,
        modelValue: '',
      },
      attachTo: document.body,
    })

    await typeInSearch(wrapper, 'zzzz')
    const labels = Array.from(document.body.querySelectorAll('[role="option"]')).map(
      (el) => el.textContent?.trim() ?? '',
    )
    expect(labels.some((t) => t.includes('Payments'))).toBe(true)
    expect(labels.some((t) => t.includes('Billing'))).toBe(true)

    wrapper.unmount()
  })

  it('shows Searching… when loading and options are empty', async () => {
    const wrapper = mount(Select, {
      props: {
        options: [],
        searchable: true,
        serverSearch: true,
        minSearchChars: 0,
        loading: true,
        modelValue: '',
      },
      attachTo: document.body,
    })

    await wrapper.find('[role="combobox"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(document.body.textContent).toContain('Searching…')

    wrapper.unmount()
  })

  it('shows min-chars hint when query is too short', async () => {
    const wrapper = mount(Select, {
      props: {
        options: [],
        searchable: true,
        serverSearch: true,
        minSearchChars: 3,
        modelValue: '',
      },
      attachTo: document.body,
    })

    await typeInSearch(wrapper, 'ab')
    expect(document.body.textContent).toContain('Type at least 3 characters')

    wrapper.unmount()
  })

  it('ignores creatable when serverSearch is true', async () => {
    const wrapper = mount(Select, {
      props: {
        options: [{ label: 'Finance', value: 'Finance' }],
        searchable: true,
        creatable: true,
        serverSearch: true,
        minSearchChars: 0,
        modelValue: '',
      },
      attachTo: document.body,
    })

    await typeInSearch(wrapper, 'Payments')
    const createBtn = Array.from(document.body.querySelectorAll('button')).find((btn) =>
      btn.textContent?.includes('Create'),
    )
    expect(createBtn).toBeUndefined()

    wrapper.unmount()
  })
})
