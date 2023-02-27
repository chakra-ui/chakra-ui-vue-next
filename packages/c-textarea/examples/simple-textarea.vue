<script setup lang="ts">
import { CTextarea } from "../src"
import { ref } from "vue"
import { chakra } from "../../vue/src"

const content = ref("")
</script>

<template>
  <chakra.main>
    <chakra.div> Value: {{ content }} </chakra.div>
    <c-textarea v-model="content" />
  </chakra.main>
</template>
