<script>
import { chakra } from '@chakra-ui/vue-system'
import { defineComponent, h } from 'vue'
import { RouterLink } from 'vue-router'


const Stories = defineComponent({
  props: ['stories'],
  inheritAttrs: false,
  setup(props) {
    return () => {
      return h(chakra.nav, {
        overflowY: 'scroll',
        w: '250px'
      }, () => [
        h(
          chakra.ul,
          {
            p: 0,
            m: 0,
            w: '175px',
            listStyleType: 'none',
          },
          () => props.stories
            .filter(story => story.path !== '/*')
            .map(story =>
              h(
                chakra.li,
                {
                  pl: 2,
                  fontSize: '0.8rem',
                  key: story.path,
                },
                () => [story.children
                  ? h(chakra.h3, { mt: 2, mb: 0, fontWeight: 'bold' }, () => story.name)
                  : h(chakra(RouterLink), {
                        to: story.path,
                        _hover: { color: 'blue.400' }
                      }, story.path === '/' 
                        ? () => [h(chakra.img, { w: '120px', mt: 4, src: 'https://res.cloudinary.com/xtellar/image/upload/v1584242872/chakra-ui/chakra-ui-vue.png' })]
                        : () => story.name),
                story.children && h(Stories, { stories: story.children })]
              )
            ),   
        )
      ])
    }
  },
})
export default Stories
</script>