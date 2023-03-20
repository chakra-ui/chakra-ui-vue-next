import { chakra } from '@chakra-ui/vue-next';

export default defineComponent({
  name: "ExternalLink",
  setup(_, { attrs }) {
    return () => (
      <chakra.svg
        width="1em"
        height="1em"
        lineHeight="1em"
        display="inline-block"
        fill="currentColor"
        viewBox="0 0 24 24" {...attrs}
      >
        <path d="M6.4 18L5 16.6L14.6 7H6V5h12v12h-2V8.4Z"/>
      </chakra.svg>
    )
  }
})