export type ModalWidth = 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'full'

export const MODAL_WIDTH_DEFAULT: ModalWidth = 'medium'

const framedHeight = 'max-h-[calc(100dvh-2rem)] overflow-y-auto'

export const modalWidthPanelClasses: Record<ModalWidth, string> = {
  small: `max-w-[400px] ${framedHeight}`,
  medium: `max-w-[600px] ${framedHeight}`,
  large: `max-w-[800px] ${framedHeight}`,
  xlarge: `max-w-[1280px] ${framedHeight}`,
  xxlarge: `max-w-[1600px] ${framedHeight}`,
  full: 'h-dvh w-dvw max-w-none rounded-none overflow-y-auto',
}

export function modalWidthShellClass(width: ModalWidth): string {
  return width === 'full' ? 'p-0' : 'p-4'
}
