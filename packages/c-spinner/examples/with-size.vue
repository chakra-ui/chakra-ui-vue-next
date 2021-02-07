<template>
  <c-spinner size="xs" mr="3" />
  <c-spinner size="sm" mr="3" />
  <c-spinner size="md" mr="3" />
  <c-spinner size="lg" mr="3" />
  <c-spinner size="xl" />
</template>

<script lang="ts">
import { CSpinner } from '@chakra-ui/c-spinner/src'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseCSpinnerExample',
  components: { CSpinner },
})
</script>
