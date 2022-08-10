import { render, screen, waitMs } from "@chakra-ui/vue-test-utils"
import { nextTick, onMounted, ref } from "vue"
import { useId, useIds } from "../src"

it("should create ids and patch once onMounted", async () => {
  render({
    template: `
    <template>
      <div>
        <div data-testid="first-id-element" :id="elementId">Single element with useId</div>
        <div>{{ count }}</div>
      </div>
    </template>
    `,
    setup() {
      const elementId = useId(undefined, "element")
      const count = ref(0)

      onMounted(() => {
        count.value++
      })

      return {
        elementId,
        count,
      }
    },
  })

  await nextTick()

  const el1 = screen.getByTestId("first-id-element")
  expect(el1.id).toEqual("element-1")

  // To ensure that the patch is invoked once
  // Allow for value of count to be changed
  await waitMs(100)

  expect(el1.id).toEqual("element-1")
})

it("`useIds` should create compound ids and patch once onMounted", async () => {
  render({
    template: `
    <template>
      <div>
        <div data-testid="compound-element-1" :id="modalId"> Element 1 </div>
        <div data-testid="compound-element-2" :id="headerId"> Element 2 </div>
        <div data-testid="compound-element-3" :id="bodyId"> Element 3 </div>
        <div>{{ count }}</div>
      </div>
    </template>
    `,
    setup() {
      const [modalId, headerId, bodyId] = useIds(
        undefined,
        "chakra-modal",
        "chakra-modal--header",
        "chakra-modal--body"
      )
      const count = ref(0)

      onMounted(() => {
        count.value++
      })

      return {
        modalId,
        headerId,
        bodyId,
        count,
      }
    },
  })

  await nextTick()

  const compoundEl1 = screen.getByTestId("compound-element-1")
  const compoundEl2 = screen.getByTestId("compound-element-2")
  const compoundEl3 = screen.getByTestId("compound-element-3")

  const assert = () => {
    expect(compoundEl1.id).toEqual("chakra-modal-2")
    expect(compoundEl2.id).toEqual("chakra-modal--header-2")
    expect(compoundEl3.id).toEqual("chakra-modal--body-2")
  }
  assert()

  // To ensure that the patch is invoked once
  // Allow for value of count to be changed
  await waitMs(100)

  assert()
})
