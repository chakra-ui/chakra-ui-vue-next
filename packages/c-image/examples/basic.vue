<template>
  <c-image
    :width="['100px', '200px']"
    src="http://example.com/non-existent-image.jpg"
    alt="welcome"
    :onLoad="basicLoad"
    :onError="basicError"
  />
</template>
<script setup lang="ts">
import { CImage } from "../index"

const props = {}

const basicLoad = () => console.log("Loaded basic image")

const basicError = () => console.error("Whoops! It's broken")
</script>
