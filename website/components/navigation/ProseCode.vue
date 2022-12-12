<script setup lang="ts">
import { CBox } from "@chakra-ui/vue-next"
import { useClipboard } from "@chakra-ui/vue-composables"
import { CodeContainer, CopyButton } from "../content/Editor/CodeEditorParts"
import CodeHighlight from "../content/Editor/CodeHighlight.vue"

const props = defineProps<{
  code: string
  language: string
}>()

const codeLanguage = computed(() => props.language.split(":")[0])
const codeLive = computed(() =>
  props.language.split(":")[1] === "live" ? true : false
)
const source = computed(() => props.code as string)
let copy = () => {}

if (process.client) {
  copy = useClipboard({ source }).copy
}
</script>

<template>
  <CBox class="code-block" pos="relative">
    <code-editor v-if="codeLive" :code="props.code" />
    <CodeContainer v-else overflow="hidden" pt="3">
      <CodeHighlight :code="props.code" :language="codeLanguage" />
      <CopyButton top="4" @click="copy()"> COPY </CopyButton>
    </CodeContainer>
  </CBox>
</template>

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
