# Plugin Options

Chakra UI's plugin gives you the ability to extend Chakra's features for your application.
Here are all the options available when configuring the plugin and their default values:

```js
import ChakraUIVuePlugin, { extendTheme } from '@chakra-ui/vue-next'

Vue.use(ChakraUIVuePlugin, {
  /**
  * Automatically includes the CSS Reset <c-reset />
  * This defaults to true (boolean)
  * 
  * @see
  * - Getting Started - TODO: Link to docs CSS Reset
  */
  cssReset: true
  /**
  * Extends the Chakra theme object with the values
  * provided in this option. Chakra UI recursively merges this
  * theme object and will overwrite defaults with extended theme
  * values.
  * 
  * @see
  * - Theme specification - https://theme-ui.com/theme-spec/
  * - Example:
  *  TODO: Link to docs extendTheme
  */
  extendTheme: extendTheme({}),
  /**
   * Enables extension of icons inside the Chakra app.
   * 
   * @see
   *  - Icons: https://next.vue.chakra-ui.com/icon
   */
  icons: {
    /**
     * The pack of the icons being used.
     * This defaults to FontAwesome (fa) or FeatherIcons (fe).
    */
    iconPack: 'fa' | 'fe',
    /**
     *The object of icon paths to be consumed.
     * For example:
     *  - faArrowUp
     *  - faArrowDown 
    */
    library: {},
    /**
     * Custom SVG paths that can be added to the
     * Chakra application and can be accessed by Chakra.
     * Chakra defaults all SVG icon paths 'viewBox' to `0 0 24 24`.
     * 
     * e.g.
     * extend: {
     *    github: {
     *       path: `<path ...> </path>`,
     *        viewbox: `0 0 24 24` 
     *    }
     * }
     * 
     * @see
     *  - Icons: https://next.vue.chakra-ui.com/icon
    */
    extend: {},
  }
})

```