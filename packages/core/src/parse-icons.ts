import { mergeWith } from '@chakra-ui/utils'

interface InternalIcon {
  [key: string]:
    | {
        path: string
        viewBox?: string
        attrs?: string
      }
    | any
}

export type MergedIcons = {
  [key in keyof InternalIcon]: InternalIcon
}

/**
 * Currently the parseIcon function only supports icon parsing
 * from the following libraries:
 * - Feather icons: feathericons.com (feather-icons-paths)
 * - FontAwesome: fontawesome.com (@fortawesome/free-solid-icons)
 *
 * The reason for this is that the above packages follow a given signature/convention.
 * Any ideas around how to improve this are welcome. Please send in a PR or open an issue
 */

const parseIcon = (iconObject: any): InternalIcon => {
  const { icon } = iconObject
  if (icon) {
    const [w, h, content, svg, path, , attrs] = icon
    return {
      [`${iconObject.iconName}`]: {
        path: iconObject.prefix.startsWith('fa')
          ? `<path d="${path}" fill="currentColor" />`
          : iconObject.prefix.startsWith('fe')
          ? content
          : svg,
        viewBox: `0 0 ${w} ${h}`,
        attrs,
      },
    }
  } else {
    return {}
  }
}

export const parseIcons = (iconSet = {}): MergedIcons => {
  const result = Object.values(iconSet)
    .map((value) => parseIcon(value))
    .reduce((target, source) => mergeWith(target, source), {})

  return result
}
