import { unref } from "vue"
import { isObject } from "@chakra-ui/utils"
import { useTheme } from "@chakra-ui/vue-system"
import { useMediaQuery } from "@vueuse/core"

export type UseBreakpointOptions = {
  fallback?: string
}

/**
 * Composable used to get the current responsive media breakpoint
 */
export function useBreakpoint(arg?: string | UseBreakpointOptions) {
  const opts = isObject(arg) ? arg : { fallback: arg ?? "base" }
  const theme = useTheme()

  // Explicitly creating the type due to the typing of
  // `theme.__breakpoints` not being deep enough to recognize it's properties
  type BreakpointsObjectType = {
    query: string
    breakpoint: string
  }

  const breakpoints: BreakpointsObjectType[] = theme.__breakpoints!.details.map(
    ({ minMaxQuery, breakpoint }: any) => ({
      breakpoint,
      query: minMaxQuery.replace("@media screen and ", ""),
    })
  )
  const values = breakpoints.map((bp) => {
    const bpQuery = useMediaQuery(bp.query)

    return bpQuery
  })

  const index = unref(values).findIndex((value) => value.value == true)

  return breakpoints[index]?.breakpoint ?? opts.fallback
}
