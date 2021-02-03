<script>
import { chakra } from '@chakra-ui/vue-system'
import { defineComponent, h } from 'vue'
import { RouterLink } from 'vue-router'


const Stories = defineComponent({
  props: ['stories'],
  inheritAttrs: false,
  setup(props, { attrs }) {
    return () => {
      return h(chakra.nav, [
        h(
          chakra.ul,
          {
            p: 0,
            h: '100%',
            m: 0,
            listStyleType: 'none',
            padding: 4,
          },
          props.stories
            .filter(story => story.path !== '/*')
            .map(story =>
              h(
                chakra.li,
                {
                  pl: 4,
                  key: story.path
                },
                story.children
                  ? h(chakra.h3, story.name)
                  : [h(RouterLink, { to: story.path }, story.path === '/' ? () => [h(chakra.img, { w: '120px', src: 'https://res.cloudinary.com/xtellar/image/upload/v1584242872/chakra-ui/chakra-ui-vue.png' })] : () => story.name)],
                story.children && h(Stories, { stories: story.children })
              )
            ),   
        )
      ])
    }
  },
})
export default Stories
</script>
