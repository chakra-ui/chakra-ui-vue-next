<template>
  <div>
    <div>Hello world</div>
    <Button>Button</Button>
    <chakra.button
      aria-label="Dope button"
      :bg="['pink.500', 'yellow.500', 'orange.500', 'green.500']"
      color="white"
      px="4"
      py="2"
      @click="handleClick"
      :layer-style="{
        bg: 'black',
        color: 'white',
      }"
    >
      Hot pink
    </chakra.button>
    <CButton />
  </div>
</template>

<script lang="tsx" setup>
import { defineComponent, h } from "vue"
import styled from "../src"
import { _chakra as chakra } from "@chakra-ui/vue-system"

const Button = chakra("button", {
  baseStyle: {
    bg: "blue.700",
    color: "white",
    fontWeight: "bold",
    px: 4,
    py: 3,
  },
})

function handleClick(e: MouseEvent) {
  console.log("Clicked", e)
}

const CButton = defineComponent({
  setup() {
    return () => (
      <Button
        height="32px"
        bg="teal.100"
        _hover={{ bg: "teal.200" }}
        onClick={handleClick}
      >
        Yo this is a button
      </Button>
    )
  },
})
</script>
