import { reactive, watchEffect } from "vue"
import { LiveRegion, LiveRegionOptions } from "./live-region"

export function useLiveRegion(options?: LiveRegionOptions) {
  const liveRegion = reactive(() => new LiveRegion(options))

  watchEffect((cleanup) => cleanup(() => liveRegion().destroy()))

  return liveRegion()
}
