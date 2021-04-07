<template>
  <c-modal :id="modalId"> HELLO CModal </c-modal>
  <c-modal :id="headerId"> HELLO 1 CModal </c-modal>
  <c-modal :id="bodyId"> HELLO 2 CModal </c-modal>
</template>

<script setup lang="ts">
import { useId, useIds } from '../../vue-composables'

// const modalId = useId(undefined, 'modal')
const [modalId, headerId, bodyId] = useIds(
  undefined,
  'chakra-modal',
  'chakra-modal--header',
  'chakra-modal--body'
)
</script>
