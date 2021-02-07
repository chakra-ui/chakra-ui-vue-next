<template>
  <c-spinner label="My spinner label" />
</template>

<script lang="ts">
import { CSpinner } from '@chakra-ui/c-spinner/src'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseCSpinnerExample',
  components: { CSpinner },
})
</script>
