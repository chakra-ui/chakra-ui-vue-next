import {
  shouldShowFallbackImage,
  type FallbackStrategy,
} from "../src/use-image"

type Status = "failed" | "pending" | "loaded"
describe.each<{
  status: Status
  strategy: FallbackStrategy
  result: boolean
}>([
  { status: "loaded", strategy: "beforeLoadOrError", result: false },
  { status: "failed", strategy: "beforeLoadOrError", result: true },
  { status: "pending", strategy: "beforeLoadOrError", result: true },
  { status: "loaded", strategy: "onError", result: false },
  { status: "failed", strategy: "onError", result: true },
  { status: "pending", strategy: "onError", result: false },
])("shouldShowFallbackImage", ({ status, strategy, result }) => {
  it(`with status: "${status}", strategy: "${strategy}", returns: "${result}"`, () => {
    expect(shouldShowFallbackImage(status, strategy)).toBe(result)
  })
})
