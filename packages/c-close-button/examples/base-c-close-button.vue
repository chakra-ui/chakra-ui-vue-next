<template>
  <c-close-button @click="handleClose" />
</template>

<script lang="ts" setup>
const handleClose = () => console.log('closing modal')
</script>
