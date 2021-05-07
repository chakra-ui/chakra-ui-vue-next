<script>
import { chakra } from '@chakra-ui/vue-system'
import { defineComponent, h } from 'vue'
import { RouterLink } from 'vue-router'

const Stories = defineComponent({
  props: ['stories'],
  inheritAttrs: false,
  setup(props) {
    return () => {
      const chakraLogo = h(
        chakra(RouterLink),
        {
          to: '/',
          _hover: { color: 'blue.400' },
        },
        () =>
          h(chakra.img, {
            w: '120px',
            mt: 4,
            src:
              'https://res.cloudinary.com/xtellar/image/upload/v1584242872/chakra-ui/chakra-ui-vue.png',
          })
      )

      const storyTitle = (story) =>
        h(chakra.h3, { mt: 2, mb: 0, fontWeight: 'bold' }, () => story.name)

      const storyItem = (story) => {
        if (story.path === '/') {
          return chakraLogo
        } else
          return h(
            chakra(RouterLink),
            {
              to: story.path,
              _hover: { color: 'blue.400' },
            },
            () => story.name
          )
      }

      const liItem = (story) =>
        h(
          chakra.li,
          {
            pl: 2,
            fontSize: '0.8rem',
            key: story.path,
          },
          () => [
            story.children ? storyTitle(story) : storyItem(story),
            story.children && h(Stories, { stories: story.children }),
          ]
        )

      return h(chakra.nav, { overflowY: 'scroll', w: '250px' }, () =>
        h(
          chakra.ul,
          {
            p: 0,
            m: 0,
            w: '175px',
            listStyleType: 'none',
          },
          () => props.stories.map(liItem)
        )
      )
    }
  },
})
export default Stories
</script>