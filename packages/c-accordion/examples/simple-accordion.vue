<template>
  <chakra.div w="400px">
    <c-accordion>
      <c-accordion-item>
        <c-accordion-button>
          <c-v-stack align="flex-start">
            <chakra.p font-weight="bold"> Watercraft </chakra.p>
            <chakra.p font-size="0.8em">Yatches, Boats and Dinghies</chakra.p>
          </c-v-stack>
        </c-accordion-button>
        <c-accordion-panel> Sample accordion content </c-accordion-panel>
      </c-accordion-item>
      <c-accordion-item>
        <c-accordion-button>
          <c-v-stack align="flex-start">
            <chakra.p font-weight="bold"> Automobiles </chakra.p>
            <chakra.p font-size="0.8em">Yatches, Boats and Dinghies</chakra.p>
          </c-v-stack>
        </c-accordion-button>
        <c-accordion-panel> Sample accordion content </c-accordion-panel>
      </c-accordion-item>
      <c-accordion-item>
        <c-accordion-button>
          <c-v-stack align="flex-start">
            <chakra.p font-weight="bold"> Aircrafts </chakra.p>
            <chakra.p font-size="0.8em">Yatches, Boats and Dinghies</chakra.p>
          </c-v-stack>
        </c-accordion-button>
        <c-accordion-panel> Sample accordion content </c-accordion-panel>
      </c-accordion-item>
    </c-accordion>
  </chakra.div>
</template>

<script lang="ts" setup>
import {
  CAccordion,
  CAccordionItem,
  CAccordionButton,
  CAccordionPanel,
} from "../src"
import { chakra } from "@chakra-ui/vue-next"
import { useId, useIds } from "@chakra-ui/vue-composables"
import { watchEffect } from "vue"

const data = [
  { title: "Watercraft", content: "Sample accordion content" },
  { title: "Automobiles", content: "Sample accordion content" },
  { title: "Aircrafts", content: "Sample accordion content" },
]

const id = useId()
const idWithName = useId()
const ids = useIds(`accordion-${id}`, "button", "panel", "item")

watchEffect(() => {
  console.log("id", id.value)
  console.log("idWithName", idWithName.value)
  console.log(
    "ids",
    ids.map((id) => id.value)
  )
})
</script>
