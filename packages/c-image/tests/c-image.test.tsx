import { testA11y } from "@chakra-ui/vue-test-utils"
import { render } from "@chakra-ui/vue-test-utils"
import { CImage } from "../src"

const SRC = "https://image.xyz/source"
const FALLBACK_SRC = "https://image.xyz/placeholder"

const renderComponent = (
  props: {
    noFallback?: boolean
  } = {}
) => {
  const { noFallback = false } = props
  return render({
    components: {
      CImage,
    },
    data: () => {
      return {
        src: SRC,
        fallbackSrc: !noFallback ? FALLBACK_SRC : undefined,
      }
    },
    template: `
    <c-image alt='img' :src="src" :fallbackSrc="fallbackSrc" />
    `,
  })
}

describe("CImage", () => {
  it("creates an instance of Image when mounted", () => {
    const { getByRole } = renderComponent()

    expect(getByRole("img")).toBeInstanceOf(HTMLImageElement)
  })

  it("passes a11y test", async () => {
    await testA11y(renderComponent())
  })

  it("renders placeholder first, before image load", () => {
    const { getByRole } = renderComponent()

    expect(getByRole("img")).toHaveAttribute("src", FALLBACK_SRC)
  })

  it("renders image if there is no fallback behavior defined", () => {
    const { getByRole } = renderComponent({ noFallback: true })

    expect(getByRole("img")).toHaveAttribute("src", SRC)
  })
})
