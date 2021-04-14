<template>
  <c-button size="sm" @click="minw = '200px'" mb="4"
    >increase min width</c-button
  >
  <c-simple-grid
    columns="2"
    :spacingX="['5px', '40px']"
    :spacingY="['5px', '20px']"
    :minChildWidth="minw"
  >
    <c-box bg="tomato" height="80px"></c-box>
    <c-box bg="tomato" height="80px"></c-box>
    <c-box bg="tomato" height="80px"></c-box>
    <c-box bg="tomato" height="80px"></c-box>
    <c-box bg="tomato" height="80px"></c-box>
  </c-simple-grid>
</template>
<script setup lang="ts">
import { ref } from 'vue-demi'

const minw = ref('100px')
</script>
