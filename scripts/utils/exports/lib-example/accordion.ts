import { defineComponent, h } from "vue"

export interface CAccordionProps {
  name: string
  activeIndex: number
}
export const CAccordion = defineComponent((props: CAccordionProps) => {
  return () => h("div", "Hello Accordion")
})

const CAccordionDefaultExport = {
  some: "random",
  object: true,
}
export default CAccordionDefaultExport
