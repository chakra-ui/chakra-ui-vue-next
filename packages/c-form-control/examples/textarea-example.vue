<template>
  <c-form-control id="first-name" is-invalid is-required w="400px">
    <c-form-label> First name </c-form-label>
    <c-textarea id="first-name" placeholder="First Name" />
    <c-form-helper-text> Keep it very short and sweet! </c-form-helper-text>
    <c-form-error-message>
      <c-form-error-icon />
      Your first name is invalid
    </c-form-error-message>
  </c-form-control>
</template>

<script lang="tsx">
import { h, defineComponent, computed, toRefs } from "vue"
import {
  chakra,
  useMultiStyleConfig,
  omitThemingProps,
} from "@chakra-ui/vue-system"
import { useFormControl } from "../src"
import { vueThemingProps } from "@chakra-ui/vue-utils"

const CTextarea = defineComponent({
  props: vueThemingProps,
  setup(props) {
    const styles = useMultiStyleConfig("Textarea", props)
    const _props = computed(() => toRefs(omitThemingProps(props)))
    const inputProps = useFormControl(_props.value)
    return () => (
      <chakra.textarea
        __label="first-name"
        __css={styles.value}
        {...inputProps.value}
      />
    )
  },
})
export default CTextarea
</script>
