<template>
  <c-image
    src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
    w="{240}"
    h="{240}"
    fallbackStrategy="onError"
    fallbackSrc="https://via.placeholder.com/240"
  />
  <c-image
    w="{240}"
    h="{240}"
    src="https://bit.ly/dan-abramov"
    fallbackStrategy="beforeLoadOrError"
    fallbackSrc="https://via.placeholder.com/240"
  />
</template>
<script setup lang="ts">
import { CImage } from "../index"
</script>
