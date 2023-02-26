import { arrayToObjectNotation, isObject } from "@chakra-ui/utils"
import { useTheme } from "@chakra-ui/vue-system"
import { getClosestValue } from "./media.utils"
import { useBreakpoint, UseBreakpointOptions } from "./use-breakpoint"

export function useBreakpointValue<T = any>(
  values: Partial<Record<string, T>> | T[],
  arg?: UseBreakpointOptions | string
): T | undefined {
  const opts = isObject(arg) ? arg : { fallback: arg ?? "base" }
  const breakpoint = useBreakpoint(opts)
  const theme = useTheme()

  if (!breakpoint) return

  const breakpoints: string[] = Array.from(theme.__breakpoints?.keys || [])

  const obj = Array.isArray(values)
    ? Object.fromEntries<any>(
        Object.entries(arrayToObjectNotation(values, breakpoints)).map(
          ([key, value]) => [key, value]
        )
      )
    : values

  return getClosestValue(obj, breakpoint, breakpoints)
}
