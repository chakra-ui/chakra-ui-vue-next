<template>
  <div>
    <c-show above="md">
      <p>This is shown above the 'md' breakpoint</p>
    </c-show>
    <c-hide above="lg">
      <p>This hides above the 'lg' breakpoint</p>
    </c-hide>
  </div>
</template>
<script setup lang="ts">
import { CShow, CHide } from "../src/index"
</script>
