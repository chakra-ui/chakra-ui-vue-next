import { createContext } from "@chakra-ui/vue-utils"
import { Ref } from "vue"

export type ExpandedIndex = number | number[]

export interface UseAccordionOptions {
  /**
   * If `true`, multiple accordion items can be expanded at once.
   */
  allowMultiple?: Ref<boolean>
  /**
   * If `true`, any expanded accordion item can be collapsed again.
   */
  allowToggle?: Ref<boolean>
  /**
   * The index(es) of the expanded accordion item
   */
  index?: Ref<ExpandedIndex>
  /**
   * The initial index(es) of the expanded accordion item
   */
  defaultIndex?: Ref<ExpandedIndex>
}

const [] = createContext()
