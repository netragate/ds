import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Dialog from '@/components/overlay/Dialog.vue'
import ModalHeader from '@/components/overlay/ModalHeader.vue'
import ModalBody from '@/components/overlay/ModalBody.vue'
import ModalFooter from '@/components/overlay/ModalFooter.vue'
import ModalTitle from '@/components/overlay/ModalTitle.vue'

describe('Dialog', () => {
  it('renders title, description, body, and footer slots when open', async () => {
    const wrapper = mount(Dialog, {
      props: { open: true },
      slots: {
        title: 'Confirm',
        description: 'Are you sure?',
        default: 'Body content',
        footer: '<button type="button">OK</button>',
      },
      attachTo: document.body,
    })

    expect(document.body.textContent).toContain('Confirm')
    expect(document.body.textContent).toContain('Are you sure?')
    expect(document.body.textContent).toContain('Body content')
    expect(document.body.textContent).toContain('OK')
    wrapper.unmount()
  })

  it('hides header when title and description slots are absent', () => {
    const wrapper = mount(Dialog, {
      props: { open: true },
      slots: { default: 'Only body' },
      attachTo: document.body,
    })

    expect(document.body.querySelector('h2')).toBeNull()
    expect(document.body.textContent).toContain('Only body')
    wrapper.unmount()
  })
})

describe('Modal subcomponents', () => {
  it('ModalHeader emits close when close button is clicked', async () => {
    const wrapper = mount(ModalHeader, {
      props: { hasCloseButton: true },
      slots: { default: 'Title' },
    })
    await wrapper.find('button[aria-label="Fechar"]').trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('ModalHeader omits close button by default', () => {
    const wrapper = mount(ModalHeader, { slots: { default: 'Title' } })
    expect(wrapper.find('button[aria-label="Fechar"]').exists()).toBe(false)
  })

  it('ModalBody, ModalFooter, and ModalTitle render slots', () => {
    expect(mount(ModalBody, { slots: { default: 'Body' } }).text()).toBe('Body')
    expect(mount(ModalFooter, { slots: { default: 'Footer' } }).text()).toBe('Footer')
    expect(mount(ModalTitle, { slots: { default: 'Title' } }).text()).toBe('Title')
  })
})
