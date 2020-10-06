<template>
  <Examples :examples="examples" />
</template>

<script>
import { defineComponent, h } from 'vue'
import CButton from '@chakra-ui/c-button'
import { RouterLink } from 'vue-router'
import routes from '../.generated/routes.json'

const Examples = defineComponent({
  props: ['examples'],
  setup(props) {
    return () => {
      return h(
        'ul',
        props.examples.map(example =>
          h(
            'li',
            { key: example.path },
            example.children
              ? h('h3', example.name)
              : [h(RouterLink, { to: example.path }, () => example.name)],
            example.children && h(Examples, { examples: example.children })
          )
        )
      )
    }
  },
})

export default defineComponent({
  components: { Examples, CButton },
  setup() {
    return {
      examples: routes,
    }
  },
})
</script>
