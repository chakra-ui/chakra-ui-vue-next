<template>
  <CFlex max-h="calc(100vh - 60px)">
    <CBox w="20vw" />
    <CBox
      id="main-content"
      ref="docContainer"
      as="section"
      w="100%"
      height="calc(100vh - 60px)"
      overflow-y="scroll"
      :py="[5, 20]"
      :px="[10, 10, 20, '14rem']"
      font-family="body"
    >
      <slot />
    </CBox>
  </CFlex>
</template>

<script setup lang="ts"></script>
