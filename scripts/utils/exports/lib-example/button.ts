import { defineComponent, h } from "vue"

export interface CButtonProps {
  name: string
  tabIndex: number
}
export const CButton = defineComponent((props: CButtonProps) => {
  return () => h("div", "Hello Accordion")
})

const CButtonDefaultExport = {
  some: "random",
  object: true,
}
export default CButtonDefaultExport
