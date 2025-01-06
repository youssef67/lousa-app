import DOMPurify from 'dompurify'
import type { LargeButtonData } from '~~/types/button.type'

export const useUiUtils = () => {
  const buildLargeButtonData = (
    lineOne: string,
    lineTwo: string,
    icon: string,
    onClick: () => void
  ): LargeButtonData => {
    return {
      line1: lineOne,
      line2: lineTwo,
      icon: icon,
      onClick: onClick
    }
  }

  const sanitizeHtml = (html: string) => {
    return DOMPurify.sanitize(html)
  }

  return {
    sanitizeHtml,
    buildLargeButtonData,
  }
}
