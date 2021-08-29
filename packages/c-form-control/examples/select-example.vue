<template>
  <c-form-control id="first-name" is-invalid is-required w="400px">
    <c-form-label> First name </c-form-label>
    <c-select>
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
    </c-select>
    <c-form-helper-text> Keep it very short and sweet! </c-form-helper-text>
    <c-form-error-message>
      <c-form-error-icon />
      Your first name is invalid
    </c-form-error-message>
  </c-form-control>
</template>

<script lang="tsx" setup>
import { h, defineComponent, computed, toRefs } from 'vue'
import {
  chakra,
  useMultiStyleConfig,
  omitThemingProps,
} from '@chakra-ui/vue-system'
import { useFormControl } from '@chakra-ui/c-form-control'
import { vueThemingProps } from '@chakra-ui/vue-utils'

const CSelect = defineComponent({
  props: vueThemingProps,
  setup(props, { slots }) {
    const styles = useMultiStyleConfig('Select', props)
    const _props = computed(() => toRefs(omitThemingProps(props)))
    const inputProps = useFormControl(_props.value)
    return () => (
      <chakra.select __css={styles.value.field} {...inputProps.value}>
        {slots}
      </chakra.select>
    )
  },
})
</script>
