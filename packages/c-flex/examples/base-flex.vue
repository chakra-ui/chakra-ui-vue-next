<template>
  <c-flex align="center">
    <c-flex :bg="{ base: 'green.50', sm: 'blue.50' }" align="flex-end">
      <chakra.p>Box 1</chakra.p>
    </c-flex>
    <c-flex
      :bg="['blue.50', 'pink.50']"
      size="150px"
      align="center"
      justify="center"
    >
      <chakra.p text-align="center" bg="orange.50"> Box 2 </chakra.p>
    </c-flex>
    <chakra.div>
      <chakra.p bg="tomato" color="white"> Box 3 </chakra.p>
    </chakra.div>
  </c-flex>
</template>
