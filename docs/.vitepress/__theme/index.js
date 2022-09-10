
import Default from '../../layouts/default.vue'
import { domElements, chakra } from '@chakra-ui/vue-system'
import ChakraUIVue from '@chakra-ui/vue-next'
// import kebabCase from 'lodash.kebabcase'
function kebabCase(key) {
  const result = key.replace(/([A-Z])/g, " $1").trim();
  return result.split(" ").join("-").toLowerCase();
}

export default {
  Layout: Default,
  NotFound: () => 'custom 404', // <- this is a Vue 3 functional component
  enhanceApp({ app }) {
    // app is the Vue 3 app instance from `createApp()`. router is VitePress'
    // custom router. `siteData`` is a `ref`` of current site-level metadata.
    app.use(ChakraUIVue, {
      icons: {
        library: {
          feActivity
        }
      }
    })
  
    domElements.forEach((tag) => {
      app.component(`chakra.${tag}`, chakra(tag))
    })

    Object.keys(ChakraUIVue).forEach((component) => {
      if (kebabCase(component).startsWith('c-')) {
        app.component(component, ChakraUIVue[component])
      }
    })
  }
}