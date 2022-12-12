<template>
  <c-image
    ref="firstRef"
    srcSet="//fake.image/ 1x"
    :onLoad="firstLog"
    :onError="firstLog"
  />
  <c-img
    ref="secondRef"
    srcSet="//lorempixel.com/100/100/ 1x"
    :onLoad="secondLog"
    :onError="secondLog"
  />
</template>
<script lang="ts" setup>
import { ref } from "vue"
import { CImage, CImg } from "../index"

const firstRef = ref<{ $el: HTMLImageElement } | null>(null)
const secondRef = ref<{ $el: HTMLImageElement } | null>(null)

const firstLog = (e: any) => {
  console.log(1, "Image", e.type, firstRef.value?.$el.currentSrc)
}

const secondLog = (e: any) => {
  console.log(2, "Img", e.type, secondRef.value?.$el.currentSrc)
}
</script>
