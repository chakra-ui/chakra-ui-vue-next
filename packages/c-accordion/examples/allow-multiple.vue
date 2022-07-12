<template>
  <chakra.div w="400px">
    <c-accordion allow-multiple>
      <c-accordion-item id="poop">
        <c-accordion-button>
          <c-v-stack align="flex-start" w="full">
            <chakra.p font-weight="bold"> Watercraft </chakra.p>
            <chakra.p font-size="0.8em">Yatches, Boats and Dinghies</chakra.p>
          </c-v-stack>
          <c-accordion-icon />
        </c-accordion-button>
        <c-accordion-panel> Sample accordion content </c-accordion-panel>
      </c-accordion-item>
      <c-accordion-item>
        <c-accordion-button>
          <c-v-stack align="flex-start" w="full">
            <chakra.p font-weight="bold"> Automobiles </chakra.p>
            <chakra.p font-size="0.8em">Yatches, Boats and Dinghies</chakra.p>
          </c-v-stack>
          <c-accordion-icon />
        </c-accordion-button>
        <c-accordion-panel> Sample accordion content </c-accordion-panel>
      </c-accordion-item>
      <c-accordion-item>
        <c-accordion-button>
          <c-v-stack align="flex-start" w="full">
            <chakra.p font-weight="bold"> Aircrafts </chakra.p>
            <chakra.p font-size="0.8em">Yatches, Boats and Dinghies</chakra.p>
          </c-v-stack>
          <c-accordion-icon />
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
  CAccordionIcon,
} from "@chakra-ui/c-accordion"
</script>
