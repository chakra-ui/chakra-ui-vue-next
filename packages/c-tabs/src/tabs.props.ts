import { PropType } from "vue"
import { UseTabsProps } from "./use-tabs"
import { HTMLChakraProps } from "@chakra-ui/vue-system"
import { Assign } from "@chakra-ui/vue-utils"
import type * as T from "@zag-js/types"

type UseTabsPropsContext = UseTabsProps["context"]

export interface CTabsProps
  extends Assign<HTMLChakraProps<"div">, UseTabsPropsContext> {
  defaultValue?: UseTabsProps["defaultValue"]
}

export const tabsProps = {
  defaultValue: {
    type: String as PropType<CTabsProps["defaultValue"]>,
  },
  orientation: {
    type: String as PropType<CTabsProps["orientation"]>,
  },
  activationMode: {
    type: String as PropType<CTabsProps["activationMode"]>,
    default: "automatic",
  },
  dir: {
    type: String as PropType<CTabsProps["dir"]>,
  },
  loop: {
    type: Boolean as PropType<CTabsProps["loop"]>,
  },
  translation: {
    type: Object as PropType<CTabsProps["translations"]>,
  },
  ids: {
    type: Object as PropType<CTabsProps["ids"]>,
  },
  getRootNode: {
    type: Function as PropType<CTabsProps["getRootNode"]>,
  },
}
