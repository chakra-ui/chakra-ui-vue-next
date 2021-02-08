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
            w: '175px',
            listStyleType: 'none',
          },
          props.stories
            .filter(story => story.path !== '/*')
            .map(story =>
              h(
                chakra.li,
                {
                  pl: 2,
                  fontSize: '0.8rem',
                  key: story.path,
                  color: 'gray.700'
                },
                story.children
                  ? h(chakra.h3, { mt: 2, mb: 0, fontWeight: 'bold' }, story.name)
                  : [h(chakra(RouterLink), { to: story.path, color: 'gray.600', _hover: { color: 'blue.400'} }, story.path === '/' ? () => [h(chakra.img, { w: '120px', mt: 4, src: 'https://res.cloudinary.com/xtellar/image/upload/v1584242872/chakra-ui/chakra-ui-vue.png' })] : () => story.name)],
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

<style>
.router-link-active {
  color: #4299e1 !important;
  font-weight: bold;
  text-decoration: underline;
}
</style>