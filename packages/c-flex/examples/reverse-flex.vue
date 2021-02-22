<template>
  <div>
    <chakra.h2>Reverse (row default)</chakra.h2>
    <c-flex reverse justify-content="space-between">
      <chakra.div
        rounded="md"
        w="12"
        h="12"
        shadow="inner"
        mr="3"
        bg="green.500"
      >
        div 1
      </chakra.div>
      <chakra.div
        rounded="md"
        w="12"
        h="12"
        shadow="inner"
        mr="3"
        bg="blue.500"
      >
        div 2
      </chakra.div>
      <chakra.div rounded="md" w="12" h="12" shadow="inner" mr="3" bg="red.500">
        div 3
      </chakra.div>
    </c-flex>
    <chakra.h2>Reverse Row</chakra.h2>
    <c-flex row reverse justify-content="space-between">
      <chakra.div
        rounded="md"
        w="12"
        h="12"
        shadow="inner"
        mr="3"
        bg="green.500"
      >
        div 1
      </chakra.div>
      <chakra.div
        rounded="md"
        w="12"
        h="12"
        shadow="inner"
        mr="3"
        bg="blue.500"
      >
        div 2
      </chakra.div>
      <chakra.div rounded="md" w="12" h="12" shadow="inner" mr="3" bg="red.500">
        div 3
      </chakra.div>
    </c-flex>
    <chakra.h2>Reverse Column</chakra.h2>
    <c-flex column reverse justify-content="space-between">
      <chakra.div
        rounded="md"
        w="12"
        h="12"
        shadow="inner"
        mr="3"
        bg="green.500"
      >
        div 1
      </chakra.div>
      <chakra.div
        rounded="md"
        w="12"
        h="12"
        shadow="inner"
        mr="3"
        bg="blue.500"
      >
        div 2
      </chakra.div>
      <chakra.div rounded="md" w="12" h="12" shadow="inner" mr="3" bg="red.500">
        div 3
      </chakra.div>
    </c-flex>
  </div>
</template>
