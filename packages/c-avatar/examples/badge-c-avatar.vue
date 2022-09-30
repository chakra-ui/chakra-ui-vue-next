<template>
  <c-stack>
    <chakra.p font-weight="bold">Default </chakra.p>
    <c-h-stack align="center" spacing="1">
      <c-avatar name="Sasuke Uchiha" size="sm">
        <c-avatar-badge bg="gray.500" />
      </c-avatar>
      <c-avatar name="Evan You">
        <c-avatar-badge bg="red.500" />
      </c-avatar>
      <c-avatar size="lg">
        <c-avatar-badge bg="orange.500" />
      </c-avatar>
      <c-avatar
        src="https://www.github.com/yyx990803.png"
        size="xl"
        alt="Evan you"
        lazy
      >
        <c-avatar-badge bg="green.500" aria-label="Online" title="Online" />
      </c-avatar>
    </c-h-stack>
    <chakra.p font-weight="bold">All positions</chakra.p>
    <c-h-stack align="center" spacing="1">
      <c-avatar name="Sasuke Uchiha" size="sm">
        <c-avatar-badge placement="top-start" bg="gray.500" />
      </c-avatar>
      <c-avatar name="Evan You">
        <c-avatar-badge placement="top-end" bg="red.500" />
      </c-avatar>
      <c-avatar size="lg">
        <c-avatar-badge placement="bottom-start" bg="orange.500" />
      </c-avatar>
      <c-avatar
        src="https://www.github.com/yyx990803.png"
        size="xl"
        alt="Evan you"
        lazy
      >
        <c-avatar-badge bg="green.500" aria-label="Online" title="Online" />
      </c-avatar>
    </c-h-stack>
    <chakra.p font-weight="bold">With custom border colors</chakra.p>
    <c-h-stack align="center" spacing="1">
      <c-avatar name="Sasuke Uchiha" size="sm">
        <c-avatar-badge bg="gray.500" borderColor="lightgray" />
      </c-avatar>
      <c-avatar name="Evan You">
        <c-avatar-badge bg="red.500" borderColor="pink" />
      </c-avatar>
      <c-avatar size="lg">
        <c-avatar-badge bg="orange.500" borderColor="papayawhip" />
      </c-avatar>
      <c-avatar
        src="https://www.github.com/yyx990803.png"
        size="xl"
        alt="Evan you"
        lazy
      >
        <c-avatar-badge
          aria-label="Online"
          title="Online"
          bg="green.500"
          borderColor="palegreen"
        >
        </c-avatar-badge>
      </c-avatar>
    </c-h-stack>
    <chakra.p font-weight="bold">Badge with icons</chakra.p>
    <c-h-stack align="center" spacing="1">
      <c-avatar name="Sasuke Uchiha" size="sm">
        <c-avatar-badge bg="orange.500">
          <c-icon color="white" name="chevron-right" w="0.3em" />
        </c-avatar-badge>
      </c-avatar>
      <c-avatar name="Evan You">
        <c-avatar-badge bg="red.500">
          <c-icon color="white" name="minus" w="0.3em" />
        </c-avatar-badge>
      </c-avatar>
      <c-avatar size="lg">
        <c-avatar-badge bg="yellow.500">
          <c-icon color="white" name="star" w="0.3em" />
        </c-avatar-badge>
      </c-avatar>
      <c-avatar
        src="https://www.github.com/yyx990803.png"
        size="xl"
        alt="Evan you"
        loading="lazy"
      >
        <c-avatar-badge aria-label="Connected" bg="green.500">
          <c-icon color="white" name="add" w="0.3em" />
        </c-avatar-badge>
      </c-avatar>
    </c-h-stack>
  </c-stack>
</template>
<script setup>
import { CAvatar, CAvatarBadge } from "../src"
</script>
