<template>
  <c-flex align="center">
    <c-flex bg="green.50" align="flex-end">
      <chakra.p>Box 1</chakra.p>
    </c-flex>
    <c-flex bg="blue.50" size="150px" align="center" justify="center">
      <chakra.p text-align="center" bg="orange.50"> Box 2 </chakra.p>
    </c-flex>
    <chakra.div>
      <chakra.p bg="tomato" color="white"> Box 3 </chakra.p>
    </chakra.div>
  </c-flex>
  <!-- <c-flex
    direction="column"
    justify="space-between"
    :align="{ sm: 'flex-start', md: 'flex-end' }"
    wrap="wrap"
  >
    <chakra.div rounded="md" w="12" h="12" shadow="inner" bg="green.500">
      div 1
    </chakra.div>
    <chakra.div rounded="md" w="12" h="12" shadow="inner" bg="blue.500">
      div 2
    </chakra.div>
    <chakra.div rounded="md" w="12" h="12" shadow="inner" bg="red.500">
      div 3
    </chakra.div>
  </c-flex> -->
</template>
