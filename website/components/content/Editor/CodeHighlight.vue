<script setup lang="ts">
import { computed } from "vue"

import { PrismEditor } from "vue-prism-editor"
import "vue-prism-editor/dist/prismeditor.min.css"

import Prism from "prismjs"
import "prismjs/components/prism-clike"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-bash"
import "prismjs/components/prism-jsx"

const { highlight, languages } = Prism
const props = defineProps<{
  code: string
  language: string
}>()

const lang = computed(() => {
  if (props.language === "vue") {
    return "html"
  }
  return props.language
})

const highlighter = (code: string) => {
  return highlight(code.trim(), languages?.[lang.value]) // languages.<insert language> to return html with markup
}
</script>

<template>
  <prism-editor
    class="code-higlighter"
    :model-value="code"
    :highlight="highlighter"
    readonly
  ></prism-editor>
</template>
