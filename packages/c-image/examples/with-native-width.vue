<template>
  <c-image
    src="https://loremflickr.com/240/240"
    fallbackSrc="https://via.placeholder.com/240"
    htmlWidth="300"
    htmlHeight="300"
    @load="load"
  />
</template>
<script setup lang="ts">
import { CImage } from "../index"

const load = () => {
  console.log("loaded")
}
</script>
