<template>
  <c-box
    :as="as"
    :apply="apply"
    data-group=""
    :css="{ scrollMarginBlock: '6.875rem' }"
    :id="id"
  >
    <span className="content"><slot /></span>
    <c-box
      as="a"
      aria-label="anchor"
      color="emerald.500"
      fontWeight="normal"
      outline="none"
      :_focus="{ opacity: 1, boxShadow: 'outline' }"
      opacity="0"
      :_groupHover="{ opacity: 1 }"
      ml="0.375rem"
      :href="`#${id}`"
    >
      #
    </c-box>
  </c-box>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

// @ts-ignore
// eslint-disable-next-line prettier/prettier
const props = defineProps<{ id?: string, as: string, apply: string }>()
</script>
