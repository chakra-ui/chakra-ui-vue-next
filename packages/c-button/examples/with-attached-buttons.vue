<template>
  <c-button-group variant="outline" is-attached>
    <c-button color-scheme="blue">Save</c-button>
    <c-button>Cancel</c-button>
  </c-button-group>
</template>

<script lang="ts">
import { CButton, CButtonGroup } from '@chakra-ui/c-button/src'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { CButton, CButtonGroup },
})
</script>
