<template>
  <div>
    <chakra.h2>Row (default)</chakra.h2>
    <c-flex row justify-content="space-between">
      <chakra.div rounded="md" w="12" h="12" shadow="inner" bg="green.500">
        div 1
      </chakra.div>
      <chakra.div rounded="md" w="12" h="12" shadow="inner" bg="blue.500">
        div 2
      </chakra.div>
      <chakra.div rounded="md" w="12" h="12" shadow="inner" bg="red.500">
        div 3
      </chakra.div>
    </c-flex>
    <chakra.h2>Column</chakra.h2>
    <c-flex column justify-content="space-between">
      <chakra.div rounded="md" w="12" h="12" shadow="inner" bg="green.500">
        div 1
      </chakra.div>
      <chakra.div rounded="md" w="12" h="12" shadow="inner" bg="blue.500">
        div 2
      </chakra.div>
      <chakra.div rounded="md" w="12" h="12" shadow="inner" bg="red.500">
        div 3
      </chakra.div>
    </c-flex>
  </div>
</template>
