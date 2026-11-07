import { inject, onMounted, provide, ref, type InjectionKey, type Ref } from 'vue'

const STORAGE_KEY = 'ds-playground-mobile-preview'

export type PlaygroundMobilePreview = {
  isMobilePreview: Ref<boolean>
  toggleMobilePreview: () => void
}

export const PLAYGROUND_MOBILE_PREVIEW_KEY: InjectionKey<PlaygroundMobilePreview> = Symbol(
  'playground-mobile-preview',
)

export function providePlaygroundMobilePreview(): PlaygroundMobilePreview {
  const isMobilePreview = ref(false)

  function toggleMobilePreview(): void {
    isMobilePreview.value = !isMobilePreview.value
    localStorage.setItem(STORAGE_KEY, isMobilePreview.value ? '1' : '0')
  }

  onMounted(() => {
    isMobilePreview.value = localStorage.getItem(STORAGE_KEY) === '1'
  })

  const api: PlaygroundMobilePreview = { isMobilePreview, toggleMobilePreview }
  provide(PLAYGROUND_MOBILE_PREVIEW_KEY, api)
  return api
}

export function usePlaygroundMobilePreview(): PlaygroundMobilePreview {
  return (
    inject(PLAYGROUND_MOBILE_PREVIEW_KEY) ?? {
      isMobilePreview: ref(false),
      toggleMobilePreview: () => undefined,
    }
  )
}
