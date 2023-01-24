import { useTheme } from "@chakra-ui/vue-system"
import { computed } from "vue"

const getBreakpoint = (theme: Record<string, any>, value: any) => {
  return theme?.breakpoints?.[value] ?? value
}

export interface UseQueryProps {
  breakpoint?: string
  below?: string
  above?: string
}

/**
 * Returns a media query value based on theme breakpoint or given query string.
 */
export function useQuery(props: UseQueryProps) {
  const { breakpoint = "", below, above } = props

  const theme = useTheme()
  const bpBelow = getBreakpoint(theme, below)
  const bpAbove = getBreakpoint(theme, above)

  const query = computed(() => {
    if (bpAbove) return `(min-width: ${bpAbove})`

    if (bpBelow) return `(max-width: ${bpBelow})`

    return breakpoint
  })

  return query
}
