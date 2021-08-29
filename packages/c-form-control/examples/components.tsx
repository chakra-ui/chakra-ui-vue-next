import { h, defineComponent, computed, toRefs } from 'vue'
import {
  chakra,
  useMultiStyleConfig,
  omitThemingProps,
} from '@chakra-ui/vue-system'
import { useFormControl } from '@chakra-ui/c-form-control'
import { vueThemingProps } from '@chakra-ui/vue-utils'


export const CInput = defineComponent({
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