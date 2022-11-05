<script setup lang="ts">
import { CHeading, CLink } from "@chakra-ui/vue-next"

defineProps<{ id: string }>()
</script>

<template>
  <CHeading
    as="h4"
    data-group=""
    :css="{ scrollMarginBlock: '6.875rem' }"
    :id="id"
  >
    <span className="content"><slot /></span>
    <CLink
      aria-label="anchor"
      color="green.500"
      fontWeight="normal"
      outline="none"
      :_focus="{ opacity: 1, boxShadow: 'outline' }"
      opacity="0"
      :_groupHover="{ opacity: 1 }"
      ml="0.375rem"
      :href="`#${id}`"
    >
      #
    </CLink>
  </CHeading>
</template>
