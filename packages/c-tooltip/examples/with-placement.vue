<script lang="tsx">
import { computed, defineComponent } from "vue"
import { CTooltip, type CTooltipPlacement } from "../src"
import {
  chakra,
  CCircle,
  CSimpleGrid,
  CIconButton,
  CStack,
  CHeading,
} from "../../vue/src"
import { processedPlacementMap } from "./placements-map"

export default defineComponent({
  name: "WithPlacement",
  setup() {
    return () => (
      <CStack max-w="400px" spacing="8" alignItems={"flex-start"}>
        <CHeading size={"md"}>Tooltips with placement</CHeading>
        <chakra.p fontSize={"sm"}>
          The placement prop is used to position the tooltip relative to the
          trigger element.
        </chakra.p>
        <CSimpleGrid
          gap="4"
          templateColumns="repeat(5, auto)"
          gridAutoFlow="row"
          justifyContent="center"
          alignItems="center"
        >
          {processedPlacementMap.map((p) => {
            if (["null", "center"].includes(p.placement)) {
              return (
                <CCircle boxSize="8" opacity={0.5}>
                  <p.icon />
                </CCircle>
              )
            } else if (p.placement !== "null" || p.placement !== "center") {
              return (
                <CTooltip label={p.label} placement={p.placement}>
                  <CIconButton rounded="full" variant="outline">
                    <p.icon />
                  </CIconButton>
                </CTooltip>
              )
            }
          })}
        </CSimpleGrid>
      </CStack>
    )
  },
})
</script>
