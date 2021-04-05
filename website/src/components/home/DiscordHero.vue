<template>
  <CFlex
    as="section"
    :flex-dir="['column', 'column', 'row']"
    align="center"
    justify="space-between"
    font-family="body"
    color="white"
    bg="discord.accessible"
    :h="['auto', 40]"
    :px="[4, 10, 12]"
  >
    <CFlex
      flex-dir="row"
      py="10"
      :mr="{ base: '0', sm: '10' }"
      :w="{ base: '100%', sm: 'auto' }"
    >
      <CIcon name="discord" size="48px" mr="5" />
      <CBox>
        <chakra.h2 font-size="md" font-weight="bold" lineHeight="1.2" mb="1">
          Connect with the Chakra community
        </chakra.h2>
        <chakra.p>
          Feel free to ask questions, report issues, and meet new people.
        </chakra.p>
      </CBox>
    </CFlex>
    <CBox
      :w="{ base: 0, md: '10' }"
      h="100%"
      bg="vue.50"
      mx="10"
      transform="skewX(20deg)"
    />
    <CFlex
      flex-dir="row"
      :pt="[0, 10]"
      pb="10"
      h="100%"
      :w="{ base: '100%', sm: 'auto' }"
      align="center"
    >
      <CButton
        as="a"
        text-decoration="none"
        aria-label="Join Discord channel"
        href="https://discord.gg/sq2Kp6x"
        target="_blank"
        rel="noopener noreferrer"
        size="lg"
        color="black"
        bg="white"
        shadow="lg"
        :w="{ base: '100%', sm: 'auto' }"
      >
        Join the #Chakra Discord!
      </CButton>
    </CFlex>
  </CFlex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CFlex, CBox, CButton, CIcon } from '@chakra-ui/vue-next'

export default defineComponent({
  name: 'DiscordHero',
  components: {
    CFlex,
    CBox,
    CButton,
    CIcon,
  },
})
</script>
