<template>
  <chakra.div>
    <c-modal>
      <c-modal-overlay />
      <c-modal-focus-scope>
        <chakra.div>
          <c-button> Hello, Modal! ⚡️ </c-button>
        </chakra.div>
      </c-modal-focus-scope>
    </c-modal>
  </chakra.div>
</template>

<script setup lang="ts">
import { isReactive, reactive, ref, toRefs, unref } from 'vue'

const obj = {
  name: 'Jonas',
  age: 25,
}

const objAsRefs = toRefs(obj)

const unrefed = reactive(unref(objAsRefs))

console.log(unrefed, isReactive(unrefed))

unrefed.age++

console.log('unrefed.age', unrefed.age)
console.log('objAsRefs.age.value', objAsRefs.age.value)

objAsRefs.age.value++

console.log('unrefed.age', unrefed.age)
console.log('objAsRefs.age.value', objAsRefs.age.value)
</script>
