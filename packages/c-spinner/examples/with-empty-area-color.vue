<template>
  <c-spinner
    thickness="4px"
    speed="0.65s"
    emptyColor="gray.200"
    color="blue.500"
    size="xl"
  />
</template>

<script lang="ts">
import { CSpinner } from '@chakra-ui/c-spinner/src'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseCSpinnerExample',
  components: { CSpinner },
})
</script>
