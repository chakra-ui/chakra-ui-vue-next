<template>
  <div>
    <c-icon name="phone" />
    <c-icon size="6" name="email" />
    <c-icon size="10" name="sun" />
    <c-icon size="14" name="moon" />
  </div>
</template>

<script lang="ts">
import { CIcon } from '@chakra-ui/c-icon'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { CIcon },
})
</script>
