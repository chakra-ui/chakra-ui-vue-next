import { reactive, watchEffect } from "vue"
import { LiveRegion, LiveRegionOptions } from "./live-region"

/**
 * Creates a hidden live region with dynamic content based on triggered events
 * to be read out by the screen reader on change of the content.
 */
export function useLiveRegion(options?: LiveRegionOptions) {
  const liveRegion = reactive(() => new LiveRegion(options))

  watchEffect((cleanup) => cleanup(() => liveRegion().destroy()))

  return liveRegion()
}
