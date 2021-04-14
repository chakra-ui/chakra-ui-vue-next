<template>
  <CFlex
    as="section"
    :flex-dir="['column', 'column', 'row']"
    font-family="body"
    :py="[4, 10, 10]"
  >
    <c-grid
      :template-columns="['auto', 'auto', 'repeat(3, 1fr)']"
      gap="1.5rem"
      shadow="lg"
      bg="white"
      py="10"
      :px="{ base: '3', sm: '10' }"
    >
      <CBox my="3" :mx="{ base: '0', sm: '3' }">
        <CFlex align-items="center" mb="5">
          <CFlex
            justify-content="center"
            align-items="center"
            mr="5"
            bg="vue.200"
            w="50px"
            h="50px"
            rounded="full"
          >
            <IconAccessibilityAlt />
          </CFlex>
          <chakra.h2 font-size="xl"> Accessible </chakra.h2>
        </CFlex>
        Chakra UI strictly follows WAI-ARIA standards. All components come with
        proper attributes and keyboard interactions out of the box.
      </CBox>
      <CBox my="3" :mx="{ base: '0', sm: '3' }">
        <CFlex align-items="center" mb="5">
          <CFlex
            justify-content="center"
            align-items="center"
            mr="5"
            bg="vue.200"
            w="50px"
            h="50px"
            rounded="full"
          >
            <ColorPalette />
          </CFlex>
          <chakra.h2 font-size="xl"> Themeable </chakra.h2>
        </CFlex>
        Quickly and easily reference values from your theme throughout your
        entire application, on any component.
      </CBox>
      <CBox m="3" :mx="{ base: '0', sm: '3' }">
        <CFlex align-items="center" mb="5">
          <CFlex
            justify-content="center"
            align-items="center"
            mr="5"
            bg="vue.200"
            w="50px"
            h="50px"
            rounded="full"
          >
            <Cube />
          </CFlex>
          <chakra.h2 font-size="xl"> Composable </chakra.h2>
        </CFlex>
        Components were built with composition in mind. You can leverage any
        component to create new things.
      </CBox>
    </c-grid>
  </CFlex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CFlex, CBox } from '@chakra-ui/vue-next'

import IconAccessibilityAlt from '/@vite-icons/carbon/accessibility-alt'
import ColorPalette from '/@vite-icons/carbon/color-palette'
import Cube from '/@vite-icons/carbon/cube'

export default defineComponent({
  name: 'PilersHero',
  components: {
    CFlex,
    CBox,
    IconAccessibilityAlt,
    ColorPalette,
    Cube,
  },
})
</script>
