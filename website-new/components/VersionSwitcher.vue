<script lang="tsx">
import { defineComponent } from "vue"
import { useColorModeValue, CBox } from "@chakra-ui/vue-next"
import pkgJSON from "../../packages/core/package.json"
export default {}

const versions = [
  { label: `v${pkgJSON.version}`, url: "https://next.vue.chakra-ui.com/" },
  { label: "v0.8.x", url: "https://vue.chakra-ui.com" },
]

const v1Url = versions[0].url

export const VersionSwitcher = defineComponent({
  setup() {
    return () => {
      return (
        <CBox
          as="select"
          margin-end="1rem"
          variant="unstyled"
          fontWeight="semibold"
          color={useColorModeValue("gray.600", "whiteAlpha.600").value}
          bg="transparent"
          value={v1Url}
          fontSize="sm"
          flexShrink="0"
          display={{ base: "none", md: "flex" }}
          aria-label="Select the Chakra UI Docs version. You're currently viewing the version 1.0 docs"
          onChange={(e: any) => {
            document.location = e.target.value
          }}
        >
          {versions.map(({ label, url }) => (
            <option key={url} value={url}>
              {label}
            </option>
          ))}
        </CBox>
      )
    }
  },
})
</script>
