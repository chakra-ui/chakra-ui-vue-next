<template>
  <c-box
    class="my-vuelive-preview"
    font-family="body"
    mt="5"
    p="3"
    :border-width="1"
    border-radius="12px"
  >
    <slot name="preview"></slot>
  </c-box>
  <c-box pos="relative">
    <code-container>
      <c-box
        font-size="14"
        overflow-x="auto"
        font-family="SF Mono, Menlo, monospace"
      >
        <slot name="editor"></slot>
      </c-box>
      <copy-button>copy</copy-button>
      <editable-notice></editable-notice>
    </code-container>
  </c-box>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
import { CopyButton, EditableNotice, CodeContainer } from './CodeBlock.vue'

// this props are required to surpress the warning (`Extraneous non-props attributes`...)
// @ts-ignore
// prettier-ignore
const props = defineProps<{ code: string, language: string, prismLang: string, requires: any, dataScope:any, components:any }>()
</script>
<style></style>
