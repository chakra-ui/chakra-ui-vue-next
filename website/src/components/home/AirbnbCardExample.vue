<template>
  <chakra.div w="100%" shadow="md" p="5" bg="white">
    <chakra.img rounded="md" w="100%" src="https://bit.ly/2k1H1t6" />
    <CFlex align="baseline" mt="2">
      <CBadge variant-color="pink"> Plus </CBadge>
      <chakra.p
        ml="2"
        text-transform="uppercase"
        font-size="sm"
        font-weight="bold"
        color="pink.800"
      >
        Verified &bull; Cape Town
      </chakra.p>
    </CFlex>
    <chakra.p mt="2" font-size="xl" font-weight="semibold" line-height="short">
      Modern, Chic Penthouse with Mountain, City & Sea Views
    </chakra.p>
    <chakra.p mt="2"> $119/night </chakra.p>
    <chakra.p mt="2" align="center">
      <CIcon name="star" color="orange.400" />
      <chakra.p ml="1" font-size="sm"> <b>4.84</b> (190) </chakra.p>
    </chakra.p>
  </chakra.div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CBadge, CFlex, CIcon } from '@chakra-ui/vue-next'

export default defineComponent({
  name: 'Footer',
  components: {
    CBadge,
    CFlex,
    CIcon,
  },
})
</script>
