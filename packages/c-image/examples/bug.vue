<template>
  <div>
    <c-image :src="src" />
    <button :style="{ background: 'revert', padding: 'revert' }" @click="click">
      set image
    </button>
    <p>src set to Avatar: {{ src }}</p>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
import { CImage } from "../src"

const src = ref("")

const click = () =>
  (src.value =
    "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png")
</script>
