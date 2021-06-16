<template>
  <chakra.div :id="elementId">Single element with useId</chakra.div>
  <chakra.div :id="modalId"> Element 1 </chakra.div>
  <chakra.div :id="headerId"> Element 2 </chakra.div>
  <chakra.div :id="bodyId"> Element 3 </chakra.div>
</template>

<script setup lang="ts">
import { useId, useIds } from '../../vue-composables'

const elementId = useId(undefined, 'element')
const [modalId, headerId, bodyId] = useIds(
  undefined,
  'chakra-modal',
  'chakra-modal--header',
  'chakra-modal--body'
)
</script>
