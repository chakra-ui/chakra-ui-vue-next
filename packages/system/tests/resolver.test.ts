import theme from '@chakra-ui/vue-theme'
import { resolveStyles } from '../src'

const customTheme: any = {
  ...theme,
  layerStyles: {
    v1: {
      color: 'red.300',
      bg: 'tomato',
    },
  },
  textStyles: {
    caps: {
      textTransform: 'uppercase',
      letterSpacing: 'wide',
      fontSize: 'lg',
    },
    lower: {
      textTransform: 'lowercase',
      letterSpacing: '0.2px',
      fontSize: 'sm',
    },
  },
}

it('should resolve styles correctly', () => {
  const result = resolveStyles({
    theme: customTheme,
    layerStyle: 'v1',
    noOfLines: [3, 4],
    __css: {
      px: 4,
      color: 'green.300',
    },
    css: {
      paddingLeft: 40,
    },
    color: 'pink.300',
    px: 5,
    textTransform: 'capitalize',
    apply: { base: 'textStyles.caps', sm: 'textStyles.lower' },
    sx: {
      letterSpacing: '2px',
    },
    letterSpacing: ['8px', '50px'],
    fontSize: [10, 23],
    backgroundPosition: 'top left',
    _hover: {
      bg: 'green.300',
      fontSize: [12, 26],
      _before: {
        content: '',
        display: 'block',
      },
    },
  })

  expect(result).toMatchInlineSnapshot(`
    Object {
      "&:hover, &[data-hover]": Object {
        "&::before": Object {
          "content": "",
          "display": "block",
        },
        "background": "green.300",
        "fontSize": Array [
          12,
          26,
        ],
      },
      "WebkitBoxOrient": "vertical",
      "WebkitLineClamp": Array [
        3,
        4,
      ],
      "apply": Object {
        "base": "textStyles.caps",
        "sm": "textStyles.lower",
      },
      "background": "tomato",
      "backgroundPosition": "top left",
      "color": "pink.300",
      "display": "-webkit-box",
      "fontSize": Array [
        10,
        23,
      ],
      "letterSpacing": "2px",
      "overflow": "hidden",
      "paddingInlineEnd": "5px",
      "paddingInlineStart": "5px",
      "paddingLeft": 40,
      "textOverflow": "ellipsis",
      "textTransform": "capitalize",
    }
  `)
})

it('should override padding correctly', () => {
  const result = resolveStyles({
    theme: customTheme,
    __css: {
      paddingX: 4,
      color: 'green.300',
    },
    paddingRight: 3,
    mr: '5',
    bg: 'pinkish',
  })

  expect(result).toMatchInlineSnapshot(`
    Object {
      "background": "pinkish",
      "color": "green.300",
      "marginRight": "5px",
      "paddingInlineEnd": "4px",
      "paddingInlineStart": "4px",
      "paddingRight": "3px",
    }
  `)
})
