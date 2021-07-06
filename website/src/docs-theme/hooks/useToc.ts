import { nextTick, ref } from '@vue/runtime-core'
import {
  useWindowScroll,
  debouncedWatch,
  tryOnMounted,
  tryOnUnmounted,
} from '@vueuse/core'

interface TocOptions {
  /**
   * Css Selector of Your Content.
   * This is where our H2 and H3 headings live
   * @example
   * `#content` or `.main` or `.prose` etc.
   */
  contentSelector?: string
  /**
   * Add your offset to calculation of active heading id.
   * like your header size.
   */
  scrollTopOffset?: number
}

export const useToc = ({
  contentSelector = '#content',
  scrollTopOffset = 100,
}: TocOptions = {}) => {
  const activeTocId = ref()

  const appElement = document.body
  const pageOffset = appElement.offsetTop

  const scrollToHash = async (hash: string) => {
    if (!hash) {
      return
    }
    await nextTick()
    const scrollTarget = document.querySelector(hash) as HTMLDivElement
    const targetTop = scrollTarget.offsetTop - pageOffset - scrollTopOffset
    scrollTo(0, targetTop)
    activeTocId.value = hash.substring(1) // without #
  }

  const getAnchorTop = (anchor: HTMLElement) =>
    anchor.offsetTop - pageOffset - 15 - scrollTopOffset

  let stop: Function | null = null

  tryOnMounted(async () => {
    const { y } = useWindowScroll()
    const anchors = Array.from(
      document.querySelectorAll(
        `${contentSelector} h3[id], ${contentSelector} h2[id]`
      )
    ) as HTMLElement[]

    // set active toc id
    stop = debouncedWatch(
      y,
      () => {
        const scrollTop = y.value
        for (let i = 0; i < anchors.length; i++) {
          const anchor = anchors[i]
          const nextAnchor = anchors[i + 1]
          const isActive =
            (i === 0 && scrollTop === 0) ||
            (scrollTop >= getAnchorTop(anchor) &&
              (!nextAnchor || scrollTop < getAnchorTop(nextAnchor)))
          if (isActive) {
            const id = anchor.getAttribute('id')
            // set active toc id
            activeTocId.value = id
            return
          }
        }
      },
      { debounce: 20 }
    )
  })
  tryOnUnmounted(() => {
    if (!stop) return
    stop()
  })

  return { activeTocId, scrollToHash }
}
