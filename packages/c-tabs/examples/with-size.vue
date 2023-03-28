<script setup lang="ts">
import { ref } from "vue"
import {
  chakra,
  CSimpleGrid,
  CCode,
  CStack,
  CHeading,
  useColorModeValue,
} from "../../vue/src"
import {
  CTabs,
  CTabList,
  CTab,
  CTabPanel,
  CTabPanels,
  CTabIndicator,
} from "../src"

const value = ref("two")

const sizes = ["sm", "md", "lg"]
</script>

<template>
  <chakra.div data-testid="simple-tabs-example">
    <c-stack spacing="5">
      <c-heading size="md">Tabs - with size</c-heading>
      <c-simple-grid
        template-rows="auto auto"
        template-columns="auto auto"
        gap="4"
      >
        <c-stack
          v-for="size in sizes"
          spacing="5"
          rounded="8px"
          :border-color="
            useColorModeValue('blackAlpha.300', 'whiteAlpha.300').value
          "
          border-width="1px"
          border-style="solid"
          px="4"
          py="3"
          :key="size"
        >
          <c-heading as="h3" size="sm"
            ><c-code font-size="md" font-weight="light">{{ size }}</c-code>
          </c-heading>
          <c-tabs v-model="value" :size="size" variant="line">
            <c-tab-list>
              <c-tab value="one"> Item One </c-tab>
              <c-tab value="two"> Item Two </c-tab>
              <c-tab value="three"> Item Three </c-tab>
              <c-tab-indicator />
            </c-tab-list>

            <c-tab-panels>
              <c-tab-panel value="one"> Value Item 1 </c-tab-panel>
              <c-tab-panel value="two"> Value Item 2 </c-tab-panel>
              <c-tab-panel value="three"> Value Item 3 </c-tab-panel>
            </c-tab-panels>
          </c-tabs>
        </c-stack>
      </c-simple-grid>
    </c-stack>
  </chakra.div>
</template>
