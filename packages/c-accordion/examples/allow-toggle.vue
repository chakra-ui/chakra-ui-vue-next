<template>
  <chakra.div w="400px">
    <chakra.label>
      <input type="checkbox" v-model="isToggle" />
      Allow toggle
    </chakra.label>
    <c-accordion :allow-toggle="isToggle">
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
import { chakra } from "../../core"
import { useToggle } from "@vueuse/core"
const [isToggle] = useToggle(true)
</script>
