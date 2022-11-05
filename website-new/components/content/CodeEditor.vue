<template>
  <VueLive :code="code" :components="Chakra" :layout="CodeEditorLayout" />
</template>

<script setup lang="ts">
import { defineProps } from "vue"
import "vue-live/lib/vue-live.esm.css"
import { VueLive } from "vue-live"
import CodeEditorLayout from "./Editor/CodeEditorLayout.vue"
import "prismjs/themes/prism-twilight.min.css"

import * as Chakra from "@chakra-ui/vue-next"

const props = defineProps<{ code: string }>()
</script>
