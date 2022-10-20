<template>
  <div>
    <c-show above="sm">
      <div>Hey! I'll show above sm (480px)</div>
    </c-show>
    <c-hide below="md">
      <div>Hello!! I'll hide below md (768px)</div>
    </c-hide>
    <c-hide breakpoint="(max-width: 400px)">
      <div>Hello!! I'll be hidden at or below 400px</div>
    </c-hide>
    <c-show breakpoint="(max-width: 400px)">
      <div>Hello!! I'll be shown at or below 400px</div>
    </c-show>
  </div>
</template>
<script setup lang="ts">
import { CShow, CHide } from "../src/index"
</script>
