<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import { useColorModeValue } from '@chakra-ui/c-color-mode'
import siteConfig from '../../config/site-config'

export type ComponentLinksProps = {
  theme?: { componentName: string }
  // eslint-disable-next-line prettier/prettier
  github?: { url?: string, package?: string }
  npm?: { package: string }
  storybook?: { url: string }
}

export default defineComponent({
  props: {
    theme: [Object] as PropType<ComponentLinksProps['theme']>,
    github: [Object] as PropType<ComponentLinksProps['github']>,
    npm: [Object] as PropType<ComponentLinksProps['npm']>,
    storybook: [Object] as PropType<ComponentLinksProps['storybook']>,
  },
  setup(props) {
    const githubRepoUrl = siteConfig.repo.url

    const githubLink = (props.github?.url || props.github?.package) && (
      <c-wrap-item>
        <component-link
          url={
            props.github.url ||
            `${githubRepoUrl}/tree/main/packages/${props.github.package}`
          }
          icon="github"
          iconColor={useColorModeValue('gray.600', 'inherit').value}
          iconSize="1rem"
        >
          View source
        </component-link>
      </c-wrap-item>
    )

    const npmLink = props.npm?.package && (
      <c-wrap-item>
        <component-link
          url={`https://www.npmjs.com/package/${props.npm.package}`}
          icon="npm"
          iconSize="2rem"
          iconColor="red.500"
        >
          {props.npm.package}
        </component-link>
      </c-wrap-item>
    )

    const storybookLink = props.storybook?.url && (
      <c-wrap-item>
        <component-link
          url={props.storybook.url}
          icon="storybook"
          iconSize="1.25reme"
          iconColor="pink.500"
        >
          View storybook
        </component-link>
      </c-wrap-item>
    )
    const themeComponentLink = props.theme && (
      <c-wrap-item>
        <component-link
          url={`${githubRepoUrl}/tree/main/packages/theme/src/components/${props.theme.componentName}.ts`}
          icon="github"
          iconColor={useColorModeValue('gray.600', 'inherit').value}
          iconSize="1rem"
        >
          View theme source
        </component-link>
      </c-wrap-item>
    )

    return () => {
      return (
        <c-wrap className="component-links" mt="2rem" spacing="4">
          {githubLink}
          {themeComponentLink}
          {npmLink}
          {storybookLink}
        </c-wrap>
      )
    }
  },
})
</script>
