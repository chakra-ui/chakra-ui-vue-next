import { markRaw } from "vue"
import { createIcon } from "../../vue/src"
import { CTooltipPlacement } from "../src"

export const CircleIcon = createIcon({
  name: "CircleIcon",
  viewBox: "0 0 24 24",
  path: `<path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10zm0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16z"/>`,
})

export const DotIcon = createIcon({
  name: "DotIcon",
  viewBox: "0 0 24 24",
  path: `<path fill="currentColor" d="M12 14a2 2 0 1 1 0-4a2 2 0 0 1 0 4Z"/>`,
})

type CTooltipPlacementPositions = CTooltipPlacement | "null" | "center"

const placementsMatrix: CTooltipPlacementPositions[][] = [
  ["null", "top-start", "top", "top-end", "null"],
  ["left-start", "null", "null", "null", "right-start"],
  ["left", "null", "center", "null", "right"],
  ["left-end", "null", "null", "null", "right-end"],
  ["null", "bottom-start", "bottom", "bottom-end", "null"],
]

export const placementsMap: Map<
  CTooltipPlacementPositions,
  {
    icon: ReturnType<typeof createIcon>
    label: string
    ignored?: boolean
  }
> = new Map([
  [
    "center",
    {
      icon: CircleIcon,
      label: "",
      ignored: true,
    },
  ],
  [
    "null",
    {
      icon: DotIcon,
      label: "",
      ignored: true,
    },
  ],
  [
    "top-start",
    {
      icon: createIcon({
        name: "TopStartIcon",
        viewBox: "0 0 24 24",
        path: `<path fill="currentColor" d="M20 18v2h-6.5A6.5 6.5 0 0 1 7 13.5V7.83l-3.09 3.09L2.5 9.5L8 4l5.5 5.5l-1.41 1.41L9 7.83v5.67C9 16 11 18 13.5 18H20Z"/>`,
      }),
      label: "Top Start",
    },
  ],
  [
    "top",
    {
      icon: createIcon({
        name: "TopStartIcon",
        viewBox: "0 0 24 24",
        path: `<path fill="currentColor" d="M13 20h-2V8l-5.5 5.5l-1.42-1.42L12 4.16l7.92 7.92l-1.42 1.42L13 8v12Z"/>`,
      }),
      label: "Top",
    },
  ],
  [
    "top-end",
    {
      icon: createIcon({
        name: "TopEndIcon",
        viewBox: "0 0 24 24",
        path: `<path fill="currentColor" d="m21.5 9.5l-1.41 1.42L17 7.83v5.67a6.5 6.5 0 0 1-6.5 6.5H4v-2h6.5c2.5 0 4.5-2 4.5-4.5V7.83l-3.09 3.08L10.5 9.5L16 4l5.5 5.5Z"/>`,
      }),
      label: "Top End",
    },
  ],
  [
    "left-start",
    {
      icon: createIcon({
        name: "LeftStartIcon",
        viewBox: "0 0 24 24",
        path: `<path fill="currentColor" d="M20 13.5V20h-2v-6.5C18 11 16 9 13.5 9H7.83l3.08 3.09L9.5 13.5L4 8l5.5-5.5l1.42 1.41L7.83 7h5.67a6.5 6.5 0 0 1 6.5 6.5Z"/>`,
      }),
      label: "Left Start",
    },
  ],
  [
    "left",
    {
      icon: createIcon({
        name: "LeftIcon",
        viewBox: "0 0 24 24",
        path: `<path fill="currentColor" d="M20 11v2H8l5.5 5.5l-1.42 1.42L4.16 12l7.92-7.92L13.5 5.5L8 11h12Z"/>`,
      }),
      label: "Left",
    },
  ],
  [
    "left-end",
    {
      icon: createIcon({
        name: "LeftEndIcon",
        viewBox: "0 0 24 24",
        path: `<path fill="currentColor" d="M20 4v6.5a6.5 6.5 0 0 1-6.5 6.5H7.83l3.09 3.09L9.5 21.5L4 16l5.5-5.5l1.41 1.41L7.83 15h5.67c2.5 0 4.5-2 4.5-4.5V4h2Z"/>`,
      }),
      label: "Left End",
    },
  ],
  [
    "bottom-start",
    {
      icon: createIcon({
        name: "BottomStartIcon",
        viewBox: "0 0 24 24",
        path: `<path fill="currentColor" d="M20 4v2h-6.5C11 6 9 8 9 10.5v5.67l3.09-3.08l1.41 1.41L8 20l-5.5-5.5l1.41-1.42L7 16.17V10.5A6.5 6.5 0 0 1 13.5 4H20Z"/>`,
      }),
      label: "Bottom Start",
    },
  ],
  [
    "bottom-end",
    {
      icon: createIcon({
        name: "BottomEndIcon",
        viewBox: "0 0 24 24",
        path: `<path fill="currentColor" d="M21.5 14.5L16 20l-5.5-5.5l1.41-1.41L15 16.17V10.5C15 8 13 6 10.5 6H4V4h6.5a6.5 6.5 0 0 1 6.5 6.5v5.67l3.09-3.09l1.41 1.42Z"/>`,
      }),
      label: "Bottom End",
    },
  ],
  [
    "bottom",
    {
      icon: createIcon({
        name: "BottomIcon",
        viewBox: "0 0 24 24",
        path: `<path fill="currentColor" d="M11 4h2v12l5.5-5.5l1.42 1.42L12 19.84l-7.92-7.92L5.5 10.5L11 16V4Z"/>`,
      }),
      label: "Bottom",
    },
  ],
  [
    "right-start",
    {
      icon: createIcon({
        name: "RightStartIcon",
        viewBox: "0 0 24 24",
        path: `<path fill="currentColor" d="m20 8l-5.5 5.5l-1.41-1.41L16.17 9H10.5C8 9 6 11 6 13.5V20H4v-6.5A6.5 6.5 0 0 1 10.5 7h5.67l-3.09-3.09L14.5 2.5L20 8Z"/>`,
      }),
      label: "Right Start",
    },
  ],
  [
    "right",
    {
      icon: createIcon({
        name: "RightIcon",
        viewBox: "0 0 24 24",
        path: `<path fill="currentColor" d="M4 11v2h12l-5.5 5.5l1.42 1.42L19.84 12l-7.92-7.92L10.5 5.5L16 11H4Z"/>`,
      }),
      label: "Right",
    },
  ],
  [
    "right-end",
    {
      icon: createIcon({
        name: "RightEndIcon",
        viewBox: "0 0 24 24",
        path: `<path fill="currentColor" d="m20 16l-5.5 5.5l-1.42-1.41L16.17 17H10.5A6.5 6.5 0 0 1 4 10.5V4h2v6.5C6 13 8 15 10.5 15h5.67l-3.08-3.09l1.41-1.41L20 16Z"/>`,
      }),
      label: "Right End",
    },
  ],
])

const entries = placementsMap.entries()
const placements = []

for (const [placement, meta] of entries) {
  placements.push({
    placement,
    ...meta,
    icon: markRaw(meta.icon),
  })
}

export interface PlacementsMatrixData {
  icon: ReturnType<typeof createIcon>
  label: string
  ignored?: boolean
  placement: CTooltipPlacementPositions
}

export const processedPlacementMap = placementsMatrix.reduce((acc, curr) => {
  const row = curr.reduce((_acc, _curr) => {
    const meta = placementsMap.get(_curr)
    if (meta) {
      _acc.push({
        ...meta,
        placement: _curr,
      })
    }
    return _acc
  }, [] as PlacementsMatrixData[])
  return acc.concat(row)
}, [] as PlacementsMatrixData[])
