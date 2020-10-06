<script>
import { defineComponent, h } from 'vue'
import { RouterLink } from 'vue-router'
import routes from '../.generated/routes.json'

const Stories = defineComponent({
  props: ['stories'],
  setup(props) {
    return () => {
      return h(
        'ul',
        props.stories.map(story =>
          h(
            'li',
            { key: story.path },
            story.children
              ? h('h3', story.name)
              : [h(RouterLink, { to: story.path }, () => story.name)],
            story.children && h(Stories, { stories: story.children })
          )
        )
      )
    }
  },
})

export default Stories
</script>