<template>
  <VueLive :code="code" :components="scope" :layout="CodeEditorLayout" />
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import CodeEditorLayout from './CodeEditorLayout.vue'
import 'vue-live/lib/vue-live.esm.css'
// @ts-ignore
import { VueLive } from 'vue-live'

import scope from './VueLiveScope'

// @ts-ignore
// prettier-ignore
const props = defineProps<{ code: string }>()
</script>
