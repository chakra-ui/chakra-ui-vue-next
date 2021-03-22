import { h } from 'vue'
import { mount } from '@cypress/vue'
import theme from '@chakra-ui/vue-theme'
import { CButton } from '../src'

it('should render properly', () => {
  mount(CButton, {
    global: {
      provide: {
        $chakraTheme: theme,
        $chakraColorMode: 'light',
        $chakraIcons: {},
      },
    },
    slots: {
      default: 'Button',
    },
  })
})
