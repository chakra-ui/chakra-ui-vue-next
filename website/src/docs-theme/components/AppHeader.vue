<template>
  <chakra.header
    ref="headerRef"
    :box-shadow="headerShadow"
    transition="box-shadow 0.2s, background-color 0.2s"
    pos="sticky"
    top="0"
    zIndex="3"
    left="0"
    right="0"
    width="full"
    :bg="bg"
  >
    <chakra.div height="4.5rem" mx="auto" maxW="8xl">
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
          maxW="1100px"
          align="center"
          color="gray.400"
        >
          <SearchButton></SearchButton>
          <VersionSwitcher></VersionSwitcher>
          <CHStack spacing="5" :display="{ base: 'none', md: 'flex' }">
            <CLink
              isExternal
              aria-label="Go to Chakra UI GitHub page"
              :href="siteConfig.repo.url"
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
              :href="siteConfig.discord"
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
          <mobile-nav-button @click="isOpen = true"></mobile-nav-button>
        </CFlex>
      </CFlex>
      <mobile-nav :is-open="isOpen" @close="isOpen = false"></mobile-nav>
    </chakra.div>
  </chakra.header>
</template>

<script setup lang="ts">
import { SearchButton } from './AlgoliaSearch.vue'
import { MobileNavButton } from './MobileNav.vue'
import { VersionSwitcher } from './VersionSwitcher.vue'
import { useColorMode, useColorModeValue } from '@chakra-ui/vue-next'
import { useWindowScroll } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'
import siteConfig from '@/config/site-config'

const { toggleColorMode } = useColorMode()
const text = useColorModeValue('dark', 'light')
const switchIcon = useColorModeValue('moon', 'sun')
const bg = useColorModeValue('white', 'gray.800')

const headerRef = ref<{ $el: HTMLDivElement } | undefined>(undefined)

const { y } = useWindowScroll()

const height = ref(0)

onMounted(() => {
  height.value = headerRef.value?.$el.getBoundingClientRect().height ?? 0
})

const headerShadow = computed(() => {
  return y.value > height.value ? 'sm' : undefined
})
</script>
