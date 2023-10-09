<template>
  <CContainer>
    There are many benefits to a joint design and development system. Not only
    does it bring benefits to the design team, but it also brings benefits to
    engineering teams. It makes sure that our experiences have a consistent look
    and feel, not just in our design specs, but in production
  </CContainer>
  <CVStack my="4">
    <CContainer max-w="container.xl">Extra-Large Container</CContainer>
    <CContainer max-w="container.lg">Large Container</CContainer>
    <CContainer max-w="container.md">Medium Container</CContainer>
    <CContainer max-w="container.sm">Small Container</CContainer>
  </CVStack>

  <CContainer as="span"> As prop span </CContainer>
</template>
