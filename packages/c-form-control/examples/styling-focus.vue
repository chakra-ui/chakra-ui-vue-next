<template>
  <c-form-control id="first-name" w="400px">
    <c-form-label :_focus="{ color: 'blue.600' }"> First name </c-form-label>
    <c-input placeholder="First Name" />
    <c-form-error-message> Your first name is invalid </c-form-error-message>
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
