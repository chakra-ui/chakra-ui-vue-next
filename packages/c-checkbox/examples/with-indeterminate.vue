<template>
  <c-stack>
    <c-checkbox
      v-model="allChecked"
      :is-indeterminate="isIndeterminate"
      @change="
        (value) => {
          setCheckedItems([value, value])
        }
      "
    >
      Parent checkbox
    </c-checkbox>
    <c-stack pl="6" mt="1" spacing="1">
      <c-checkbox
        :model-value="checkedItems[0]"
        @change="
          (value) => {
            setCheckedItems([value, checkedItems[1]])
          }
        "
      >
        Child Checkbox 1
      </c-checkbox>
      <c-checkbox
        :model-value="checkedItems[1]"
        @change="
          (value) => {
            setCheckedItems([checkedItems[0], value])
          }
        "
      >
        Child Checkbox 2
      </c-checkbox>
    </c-stack>
  </c-stack>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue"
import { CCheckbox } from "@chakra-ui/vue-next"

const checkedItems = ref([false, false])
function setCheckedItems(value: boolean[]) {
  checkedItems.value = [value[0], value[1]]
}

const allChecked = computed(() => checkedItems.value.every(Boolean))
const isIndeterminate = computed(
  () => checkedItems.value.some(Boolean) && !allChecked.value
)
</script>
