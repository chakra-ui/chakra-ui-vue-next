<script setup lang="ts">
import { ref } from "vue"
import { chakra, CStack, useColorModeValue } from "../../vue/src"
import {
  CTabs,
  CTabList,
  CTab,
  CTabPanel,
  CTabPanels,
  CTabIndicator,
} from "../src"

const value = ref("two")
</script>

<template>
  <chakra.div data-testid="simple-tabs-example">
    <c-simple-grid template-rows="auto auto" gap="4">
      <c-stack
        spacing="5"
        rounded="8px"
        :border-color="
          useColorModeValue('blackAlpha.300', 'whiteAlpha.300').value
        "
        border-width="1px"
        border-style="solid"
        px="4"
        py="3"
      >
        <c-heading size="sm">With Indicator</c-heading>
        <c-tabs v-model="value" variant="unstyled">
          <c-tab-list>
            <c-tab value="one"> Item One </c-tab>
            <c-tab value="two"> Item Two </c-tab>
            <c-tab value="three"> Item Three </c-tab>
          </c-tab-list>
          <c-tab-indicator
            mt="-1.5px"
            height="2px"
            bg="pink.400"
            border-radius="1px"
          />

          <c-tab-panels>
            <c-tab-panel value="one"> Value Item 1 </c-tab-panel>
            <c-tab-panel value="two"> Value Item 2 </c-tab-panel>
            <c-tab-panel value="three"> Value Item 3 </c-tab-panel>
          </c-tab-panels>
        </c-tabs>
      </c-stack>
      <c-stack
        spacing="5"
        rounded="8px"
        :border-color="
          useColorModeValue('blackAlpha.300', 'whiteAlpha.300').value
        "
        border-width="1px"
        border-style="solid"
        px="4"
        py="3"
      >
        <c-heading size="sm">With Custom Style</c-heading>
        <c-tabs v-model="value" variant="unstyled">
          <c-tab-list>
            <c-tab :_selected="{ color: 'white', bg: 'blue.500' }" value="one">
              Item One
            </c-tab>
            <c-tab :_selected="{ color: 'white', bg: 'green.500' }" value="two">
              Item Two
            </c-tab>
            <c-tab
              :_selected="{ color: 'white', bg: 'orange.500' }"
              value="three"
            >
              Item Three
            </c-tab>
          </c-tab-list>

          <c-tab-panels>
            <c-tab-panel value="one"> Value Item 1 </c-tab-panel>
            <c-tab-panel value="two"> Value Item 2 </c-tab-panel>
            <c-tab-panel value="three"> Value Item 3 </c-tab-panel>
          </c-tab-panels>
        </c-tabs>
      </c-stack>
    </c-simple-grid>
  </chakra.div>
</template>
