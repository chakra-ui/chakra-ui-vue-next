<template>
  <chakra.header
    ref="headerRef"
    :shadow="y > height ? 'sm' : undefined"
    transition="box-shadow 0.2s, background-color 0.2s"
    pos="sticky"
    top="0"
    zIndex="3"
    left="0"
    right="0"
    width="full"
  >
    <chakra.div height="4.5rem" mx="auto" maxW="1200px">
      <!-- content -->

      <CFlex w="100%" h="100%" px="6" align="center" justify="space-between">
        <CFlex align="center">
          <router-link to="/">
            <chakra.a display="block" aria-label="Chakra UI, Back to homepage">
              <Logo :display="{ base: 'none', md: 'block' }" />
              <CBox min-w="3rem" :display="{ base: 'block', md: 'none' }">
                <LogoIcon />
              </CBox>
            </chakra.a>
          </router-link>
        </CFlex>

        <!-- nav -->
        <CFlex
          justify="flex-end"
          w="100%"
          maxW="824px"
          align="center"
          color="gray.400"
        >
          <CHStack spacing="5" :display="{ base: 'none', md: 'flex' }">
            <CLink
              isExternal
              aria-label="Go to Chakra UI GitHub page"
              href="{siteConfig.repo.url}"
            >
              <CIcon
                display="block"
                transition="color 0.2s"
                w="5"
                h="5"
                :_hover="{ color: 'gray.600' }"
                name="github"
              />
            </CLink>
            <CLink
              isExternal
              aria-label="Go to Chakra UI Discord page"
              href="/discord"
            >
              <CIcon
                display="block"
                transition="color 0.2s"
                w="5"
                h="5"
                :_hover="{ color: 'gray.600' }"
                name="discord"
              />
            </CLink>
            <CLink
              isExternal
              aria-label="Go to Chakra UI YouTube channel"
              :href="siteConfig.youtube"
            >
              <CIcon
                display="block"
                transition="color 0.2s"
                w="5"
                h="5"
                :_hover="{ color: 'gray.600' }"
                name="youtube"
              />
            </CLink>
          </CHStack>
          <CIconButton
            size="md"
            fontSize="lg"
            :aria-label="`Switch to ${text} mode`"
            :title="`Switch to ${text} mode`"
            variant="ghost"
            color="current"
            :ml="{ base: '0', md: '3' }"
            @click="toggleColorMode"
            :icon="switchIcon"
          />
          <sponsor-button ml="5" />
        </CFlex>
      </CFlex>
    </chakra.div>
  </chakra.header>
</template>

<script setup lang="ts">
import { useColorMode, useColorModeValue } from '@chakra-ui/c-color-mode'
import { useWindowScroll } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import siteConfig from '@/config/site-config.ts'

const { toggleColorMode } = useColorMode()
const text = useColorModeValue('dark', 'light')
const switchIcon = useColorModeValue('moon', 'sun')

const headerRef = ref<{ $el: HTMLDivElement } | undefined>(undefined)

const { y } = useWindowScroll()

const height = ref(0)
onMounted(() => {
  height.value = headerRef.value?.$el.getBoundingClientRect().height ?? 0
})
</script>

<style></style>
