<template>
  <div :class="className">Hello World</div>
</template>

<script lang="ts" setup>
import { css } from "@emotion/css"

const className = css({
  backgroundColor: "tomato",
  color: "white",
  fontWeight: "bold",
  padding: "2rem 3rem",
})
</script>
