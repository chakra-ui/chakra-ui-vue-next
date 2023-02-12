import { createContext, getValidChildren } from "@chakra-ui/vue-utils"
import * as menu from "@zag-js/menu"
import { normalizeProps, useMachine } from "@zag-js/vue"
import { computed, ComputedRef, onMounted } from "vue"
import { useMenu } from "./c-menu"

export const [SubMenuProvider, useSubMenu] =
  createContext<InfiniteSubMenuContext>({
    name: "CSubMenuContext",
    strict: true,
  })

export const useMenuItem = (props: any, slots: any) => {
  const validChildren = getValidChildren(slots)
  const isSlotString = computed(
    () =>
      typeof validChildren?.[0].children === "string" ||
      validChildren?.[0].children instanceof String
  )

  // If multiple VNodes are passed, then we need an id for the machine to identify the entry
  if (!isSlotString.value && !props.value)
    throw new SyntaxError(
      "CMenuItem id not found : if default slot is not a string, 'value' prop must be passed"
    )
  const textValue = computed(() => props.value || validChildren[0].children)

  return { validChildren, textValue }
}

interface InfiniteSubMenuContext {
  root: ComputedRef<ReturnType<typeof menu.connect>>
  sub: ComputedRef<ReturnType<typeof menu.connect>>
  subMachine?: ReturnType<typeof menu.machine>
  machine?: ReturnType<typeof menu.machine>
}

export const useInfiniteSubMenu = (props: any): InfiniteSubMenuContext => {
  let root: InfiniteSubMenuContext["root"]
  let machine: ReturnType<typeof menu.machine>
  try {
    const parentMachine = useSubMenu()
    root = parentMachine.sub
    machine = parentMachine.machine!
  } catch {
    const rootMachine = useMenu()
    root = rootMachine.root
    machine = rootMachine.machine
  }
  const { rootEmit } = useMenu()
  const [subState, subSend, subMachine] = useMachine(
    menu.machine({
      id: props.label,
      positioning: {
        placement: "right-start",
        overlap: false,
      },
      onSelect: (value) => rootEmit("select", value),
    })
  )

  const sub = computed(() =>
    menu.connect(subState.value, subSend, normalizeProps)
  )

  onMounted(() => {
    root.value.setChild(subMachine)
    sub.value.setParent(machine)
  })

  return { root, sub, subMachine }
}
