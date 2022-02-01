import { ComputedRef, Ref, ref, unref } from "vue"
import { useEventListener, WindowEventName } from "./use-event-listener"

export function useClipboard({
  source,
  copyTimeout = 1000,
  read = false,
}: {
  source?: ComputedRef<string> | Ref<string>
  copyTimeout?: number
  read?: boolean
}) {
  const isSupported = Boolean(navigator && "clipboard" in navigator)
  const text = ref("")

  const copied = ref(false)

  const timeout = () => {
    let t = setTimeout(() => {
      copied.value = false
    }, copyTimeout)
  }

  const events = ["copy", "cut"]
  if (isSupported && read) {
    for (const event of events)
      useEventListener(event as WindowEventName, updateText)
  }

  function updateText() {
    navigator.clipboard.readText().then((value) => {
      text.value = value
    })
  }

  async function copy(_value = unref(source)) {
    const value = unref(_value)
    if (isSupported && value != null) {
      await navigator.clipboard.writeText(value)
      text.value = value
      copied.value = true
      timeout()
    }
  }

  return {
    copy,
    text: text as ComputedRef<string>,
    copied: copied as ComputedRef<boolean>,
  }
}
