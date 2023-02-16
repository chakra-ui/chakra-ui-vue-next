<template>
  <chakra.div>
    <c-v-stack>
      <c-input variant="outline" placeholder="Outline" />
      <c-input variant="filled" placeholder="Filled" />
      <c-input variant="flushed" placeholder="Flushed" />
      <c-input variant="unstyled" placeholder="Unstyled" />
    </c-v-stack>
  </chakra.div>
</template>

<script lang="ts" setup>
import { chakra } from "../../core"
</script>
