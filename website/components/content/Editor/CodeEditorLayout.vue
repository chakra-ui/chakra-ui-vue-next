<script setup lang="ts">
import { computed } from "vue"
import { CBox, useClipboard } from "@chakra-ui/vue-next"
import { CopyButton, CodeContainer, EditableNotice } from "./CodeEditorParts"

const props = defineProps<{
  code: string
  language: string
  prismLang: string
  requires: any
  dataScope: any
  components: any
}>()

const source = computed(() => props.code as string)
let copy = () => {}

if (process.client) {
  copy = useClipboard({ source }).copy
}
</script>

<template>
  <CBox
    class="my-vuelive-preview"
    font-family="body"
    mt="5"
    p="3"
    :border-width="1"
    border-radius="12px"
  >
    <slot name="preview"></slot>
  </CBox>
  <CBox pos="relative">
    <CodeContainer>
      <CBox font-size="14" overflow-x="auto" font-family="IBM Plex Mono">
        <slot name="editor"></slot>
      </CBox>
      <CopyButton top="4" @click="copy()">copy</CopyButton>
      <EditableNotice></EditableNotice>
    </CodeContainer>
  </CBox>
</template>
