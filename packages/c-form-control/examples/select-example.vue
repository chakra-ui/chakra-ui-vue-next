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

<script lang="tsx">
import { h, defineComponent, computed, toRefs } from "vue"
import {
  chakra,
  useMultiStyleConfig,
  omitThemingProps,
  ThemingProps,
} from "@chakra-ui/vue-system"
import { filterUndefined } from "@chakra-ui/utils"
import { useFormControl } from "../src"
import { getValidChildren, vueThemingProps } from "@chakra-ui/vue-utils"

const CSelect = defineComponent({
  props: { ...vueThemingProps },
  setup(props, { slots, attrs }) {
    const themingProps = computed<ThemingProps>(() =>
      filterUndefined({
        colorScheme: props.colorScheme,
        variant: props.variant,
        size: props.size,
        styleConfig: props.styleConfig,
      })
    )
    const styles = useMultiStyleConfig("Select", themingProps.value)
    const _props = computed(() => toRefs(omitThemingProps(props)))
    const inputProps = useFormControl(_props.value)
    return () => (
      <chakra.select __css={styles.value.field} {...inputProps.value}>
        {() => getValidChildren(slots)}
      </chakra.select>
    )
  },
})

export default CSelect
</script>
