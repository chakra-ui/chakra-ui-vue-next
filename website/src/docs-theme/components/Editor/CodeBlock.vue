<script lang="tsx">
import { computed, defineComponent, renderSlot, SetupContext } from "vue"
import { BoxProps } from "@chakra-ui/vue-next"
import { DeepPartial } from "@chakra-ui/vue-system"
import { useClipboard } from "@chakra-ui/vue-composables"

export const CopyButton = (props: any, { slots }: SetupContext) => {
  return (
    <c-button
      size="sm"
      position="absolute"
      textTransform="uppercase"
      colorScheme="emerald"
      fontSize="xs"
      height="24px"
      top={0}
      zIndex="1"
      right="1.25em"
      {...props}
    >
      {renderSlot(slots, "default")}
    </c-button>
  )
}

export const EditableNotice = (props: DeepPartial<BoxProps>) => {
  return (
    <c-box
      position="absolute"
      width="full"
      top="-1.25em"
      left="0"
      roundedTop="8px"
      bg="#011627"
      py="2"
      zIndex="0"
      letterSpacing="wide"
      color="gray.400"
      fontSize="xs"
      fontWeight="semibold"
      textAlign="center"
      textTransform="uppercase"
      pointerEvents="none"
      {...props}
    >
      Editable Example
    </c-box>
  )
}

export const CodeContainer = (
  props: DeepPartial<BoxProps>,
  { slots }: SetupContext
) => (
  <c-box p="3" pt="5" rounded="8px" my="8" bg="#011627" {...props}>
    {slots}
  </c-box>
)

export default defineComponent({
  props: {
    code: String,
    language: String,
    live: { type: [Boolean, String], default: false },
  },
  setup(props) {
    const source = computed(() => props.code as string)
    const { copy } = useClipboard({ source })
    return () => {
      return (
        // live
        <c-box class="code-block" pos="relative">
          {props.live && <code-editor code={props.code} />}
          {!props.live && (
            <CodeContainer overflow="hidden" pt="3">
              <code-highlight code={props.code} language={props.language} />
              <CopyButton top="4" onClick={() => copy()}>
                COPY
              </CopyButton>
            </CodeContainer>
          )}
        </c-box>
      )
    }
  },
})
</script>
<style>
.VueLive-error {
  background: inherit !important;
}
.prism-editor__textarea,
.prism-editor__editor {
  padding: 5px !important;
  font-size: 14px !important;
  overflow-x: auto !important;
  font-family: SF Mono, Menlo, monospace !important;
}
</style>
