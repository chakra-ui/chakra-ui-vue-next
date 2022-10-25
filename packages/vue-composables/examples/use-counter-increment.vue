<template>
  <div>
    <pre>
      {{
        JSON.stringify({
          value,
          valueAsNumber,
          isOutOfRange,
        })
      }}
    </pre>
    <br />
    <button @click="increment()">Click Me to Increase!</button>
    <br />
    <button @click="decrement()">Click Me to Decrease!</button>
    <br />
    <button @click="update(4)">Update to 4!</button>
    <br />
    <input v-model="value" :style="{ background: 'transparent' }" />
  </div>
</template>
<script setup lang="ts">
import { useCounter } from "../index"

const { increment, decrement, valueAsNumber, update, value, isOutOfRange } =
  useCounter({
    max: 10,
    min: 0,
    keepWithinRange: false,
    precision: 4,
    step: 0.5,
  })
</script>
