<template>
  <c-grid template-columns="repeat(5, 1fr)" gap="6">
    <c-box w="100%" h="10" bg="blue.500" />
    <c-box w="100%" h="10" bg="blue.500" />
    <c-box w="100%" h="10" bg="blue.500" />
    <c-box w="100%" h="10" bg="blue.500" />
    <c-box w="100%" h="10" bg="blue.500" />
  </c-grid>
  <c-divider my="15" border-color="gray.500" />
  <c-grid
    h="200px"
    templateRows="repeat(2, 1fr)"
    templateColumns="repeat(5, 1fr)"
    gap="4"
  >
    <c-grid-item rowSpan="2" colSpan="1" bg="tomato" />
    <c-grid-item colSpan="2" bg="papayawhip" />
    <c-grid-item colSpan="2" bg="papayawhip" />
    <c-grid-item colSpan="4" bg="tomato" />
  </c-grid>
</template>
<script setup lang="ts"></script>
