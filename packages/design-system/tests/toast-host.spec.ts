import { afterEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import ToastHost from '@/components/feedback/ToastHost.vue'
import { useToast } from '@/composables/useToast'

describe('ToastHost', () => {
  afterEach(() => {
    const toast = useToast()
    ;[...toast.toasts].forEach((item) => toast.dismiss(item.id))
    vi.useRealTimers()
  })

  it('renders toasts for active positions and dismisses them', async () => {
    const host = mount(ToastHost, { attachTo: document.body })
    const toast = useToast()

    toast.success('Saved', { position: 'top-left', dismissible: true })
    toast.error('Failed', 'bottom-right')
    await nextTick()
    await flushPromises()

    expect(document.body.textContent).toContain('Saved')
    expect(document.body.textContent).toContain('Failed')

    const dismiss = document.body.querySelector('button[aria-label="Dismiss"]') as HTMLButtonElement
    expect(dismiss).toBeTruthy()
    dismiss.click()
    await nextTick()
    expect(document.body.textContent).not.toContain('Saved')
    expect(document.body.textContent).toContain('Failed')

    host.unmount()
  })

  it('auto-dismisses after timeout and covers remaining toast helpers', async () => {
    vi.useFakeTimers()
    const host = mount(ToastHost, { attachTo: document.body })
    const toast = useToast()

    toast.info('Info toast')
    toast.warning('Warn toast', { position: 'top-center' })
    await nextTick()
    expect(document.body.textContent).toContain('Info toast')
    expect(document.body.textContent).toContain('Warn toast')

    vi.advanceTimersByTime(3000)
    await nextTick()
    expect(document.body.textContent).not.toContain('Info toast')
    expect(document.body.textContent).not.toContain('Warn toast')

    host.unmount()
  })

  it('dismiss is a no-op for unknown ids', () => {
    const toast = useToast()
    expect(() => toast.dismiss('missing-id')).not.toThrow()
  })
})
