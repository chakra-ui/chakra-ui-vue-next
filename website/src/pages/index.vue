<template>
  <Navbar />
  <chakra.main
    :min-h="['auto', 'auto', '100vh']"
    w="100vw"
    :px="[4, 10, 12]"
    pt="60px"
  >
    <Hero />
    <CFlex
      as="section"
      py="10"
      :flex-dir="['column', 'column', 'row']"
      font-family="body"
    >
      <chakra.div
        d="grid"
        :grid-template-columns="['auto', 'auto', 'repeat(3, 1fr)']"
        :style="{ gap: '1.5rem' }"
      >
        <CBox m="3">
          <CFlex align-items="center" mb="5">
            <CFlex
              justify-content="center"
              color="white"
              align-items="center"
              mr="5"
              bg="vue.400"
              w="50px"
              h="50px"
              rounded="full"
            >
              <IconAccessibilityAlt class="icon" />
            </CFlex>
            <chakra.h4 size="md"> Accessible </chakra.h4>
          </CFlex>
          Chakra UI strictly follows WAI-ARIA standards. All components come
          with proper attributes and keyboard interactions out of the box.
        </CBox>
        <CBox m="3">
          <CFlex align-items="center" mb="5">
            <CFlex
              justify-content="center"
              color="white"
              align-items="center"
              mr="5"
              bg="vue.400"
              w="50px"
              h="50px"
              rounded="full"
            >
              <ColorPalette class="icon" />
            </CFlex>
            <chakra.h4 size="md"> Themeable </chakra.h4>
          </CFlex>
          Quickly and easily reference values from your theme throughout your
          entire application, on any component.
        </CBox>
        <CBox m="3">
          <CFlex align-items="center" mb="5">
            <CFlex
              justify-content="center"
              color="white"
              align-items="center"
              mr="5"
              bg="vue.400"
              w="50px"
              h="50px"
              rounded="full"
            >
              <Cube class="icon" />
            </CFlex>
            <chakra.h4 size="md"> Composable </chakra.h4>
          </CFlex>
          Components were built with composition in mind. You can leverage any
          component to create new things.
        </CBox>
      </chakra.div>
    </CFlex>
  </chakra.main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CFlex, CBox } from '@chakra-ui/vue-next'
import Hero from '../components/home/Hero.vue'
import Navbar from '../components/Navbar.vue'

import IconAccessibilityAlt from '/@vite-icons/carbon/accessibility-alt'
import ColorPalette from '/@vite-icons/carbon/color-palette'
import Cube from '/@vite-icons/carbon/cube'

export default defineComponent({
  name: 'Index',
  components: {
    Hero,
    Navbar,
    CFlex,
    CBox,
    IconAccessibilityAlt,
    ColorPalette,
    Cube,
  },
})
</script>
