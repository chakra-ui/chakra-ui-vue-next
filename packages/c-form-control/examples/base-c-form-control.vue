<template>
  <c-form-control id="first-name" is-invalid is-required>
    <c-form-label> First name </c-form-label>
    <c-input placeholder="First Name" />
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

const CInput = defineComponent({
  props: vueThemingProps,
  setup(props) {
    const styles = useMultiStyleConfig('Input', props)
    const _props = computed(() => toRefs(omitThemingProps(props)))
    const inputProps = useFormControl(_props.value)
    return () => (
      <chakra.input __css={styles.value.field} {...inputProps.value} />
    )
  },
})
</script>
