# Color Mode

Most @chakra-ui/vue components are dark mode compatible. You can also toggle between dark
and light modes in your chakra applications.


We added some new helpers to the Chakra Color Mode to 
simplify the access of the current color mode and the toggle color mode functions.

## Simplified Accessing Color Mode

To enable toggling between Dark and Light modes within your apps, wrap your application in a
`CColorModeProvider` component. Chakra UI globally provides computed variables for the current color mode:
- `this.chakraColorMode` - The current mode.
- `this.chakraToggleColorMode` - Function to toggle the Chakra UI Color mode

Try toggling the current colorMode

```vue live=true
<template>
  <c-button @click="chakraToggleColorMode">
    Chakra ColorMode: {{ chakraColorMode }}
  </c-button>
</template>
```


### Injecting color mode and toggle helpers
The `CColorModeProvider` component also provides two variables in it's descendant's context using the
[provide/inject](https://vuejs.org/v2/api/#provide-inject) API:
- `$chakraColorMode` => This is a function that returns the current mode. Use it the computed property.
- `$toggleColorMode` => This function toggles the current color mode value.

Below is an example of how to use the above variables:

In your main.js
```js
import Vue from 'vue'
import Chakra, { CThemeProvider, CColorModeProvider, CReset } from '@chakra-ui/vue'
import App from './App.vue'

Vue.use(Chakra)

new Vue({
  el: '#app',
  render: (h) => h(CThemeProvider, [
    h(CColorModeProvider, [
      h(CReset),
      h(App)
    ])
  ])
}).$mount()
```

In any component that needs the Chakra color mode, you can now access it by injecting it into that
component's state:

_In your `App.vue` file._

```vue live=true
<template>
  <c-box>
    <c-button @click="$toggleColorMode">
      Chakra ColorMode: {{ colorMode }}
    </c-button>
  </c-box>
</template>

<script lang="js">

export default {
  name: 'App',
  inject: ['$chakraColorMode', '$toggleColorMode'],
  computed: {
    /**
     * In order to preserve reactivity, Chakra provides the color mode
     * inside the `$chakraColorMode` function. This function returns the current
     * color mode.
     */
    colorMode () {
      return this.$chakraColorMode()
    }
  },
}
</script>
```

## Forcing a specific mode

On some occasions, you might want Chakra components to look the same in both
light and dark modes. To achieve this, wrap the component in `CLightMode` or
`CDarkMode` component. Doing this will override the global `$chakraColorMode`.

> Click the **"Toggle Mode"** button to see it in action.

```vue live=true
<template>
  <c-stack should-wrap-children is-inline>
    <c-light-mode>
      <c-button size="sm" variant-color="blue">
        Light Mode Always
      </c-button>
    </c-light-mode>

    <c-dark-mode>
      <c-button  size="sm" variant-color="blue">
        Dark Mode Always
      </c-button>
    </c-dark-mode>

    <c-button size="sm" variant-color="blue" @click="$toggleColorMode">
      Toggle Color Mode
    </c-button>
  </c-stack>
</template>

<script lang="js">

export default {
  name: 'App',
  inject: ['$toggleColorMode']
}
</script>
```

## Computing values with `mode` utility function
`@chakra-ui/vue@^0.10.0` exports a `mode` function that accepts two arguments for the `'light'` and `'dark'` mode respectively.
When the current color mode is `'light'`, it returns the first argument. If the color mode is `'dark'`, it returns the second argument.

```js
import Vue from 'vue'
import Chakra, { mode } from '@chakra-ui/vue'

Vue.use(Chakra, {
  extendTheme: {
    baseStyles: {
      CIconButton: () => ({
        /**
         * When the color mode is `light`, `mode` returns `'blackAlpha.700'`.
         * Otherwise it returns `'whiteAlpha.400'`.
         */
        color: mode('blackAlpha.700', 'whiteAlpha.400')
      })
    }
  }
})
```

### Usage in templates
The `mode` function is also made globally available inside your Vue application context so you do not have to import it inside your 
Vue SFCs. You can access it by invoking `this.$mode` in the template or in your script.

```vue live=true
<template>
  <c-box
    :bg="[
      $mode('orange.600', 'yellow.100'),
      $mode('pink.600', 'green.100')
    ]"
    :color="$mode('white', 'blackAlpha.800')"
    @click="chakraToggleColorMode"
  >
    Box "{{ chakraColorMode }}" mode. Click me to toggle color mode.
  </c-box>
</template>
```