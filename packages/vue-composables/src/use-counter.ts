import { clampValue, countDecimalPlaces, toPrecision } from "@chakra-ui/utils"
import { computed, ref, watchEffect } from "vue"

export interface UseCounterProps {
  /**
   * The number of decimal points used to round the value
   */
  precision?: number
  /**
   * The initial value of the counter. Should be less than `max` and greater than `min`
   */
  defaultValue?: string | number
  /**
   * The step used to increment or decrement the value
   * @default 1
   */
  step?: number
  /**
   * The minimum value of the counter
   * @default Number.MIN_SAFE_INTEGER
   */
  min?: number
  /**
   * The maximum value of the counter
   * @default Number.MAX_SAFE_INTEGER
   */
  max?: number
  /**
   * This controls the value update behavior in general.
   *
   * - If `true` and you use the stepper or up/down arrow keys,
   *  the value will not exceed the `max` or go lower than `min`
   *
   * - If `false`, the value will be allowed to go out of range.
   *
   * @default true
   */
  keepWithinRange?: boolean
}

/**
 * Composable providing step functionality
 */
export function useCounter(props: UseCounterProps = {}) {
  const {
    precision: precisionProp,
    defaultValue = 0,
    step: stepProp = 1,
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    keepWithinRange = true,
  } = props

  const valueState = ref<string | number>(
    (() => {
      if (defaultValue == null) return ""
      return cast(defaultValue, stepProp, precisionProp) ?? ""
    })()
  )

  const decimalPlaces = ref(0)

  let precision: number

  const update = (next: string | number) => {
    if (next === valueState.value) return
    valueState.value = toPrecision(parse(next), precision).toString()
  }

  const clamp = (value: number) => {
    let nextValue = value

    if (keepWithinRange) {
      nextValue = clampValue(nextValue, min, max)
    }

    return toPrecision(nextValue, precision)
  }

  const increment = (step: number = stepProp) => {
    let next: string | number

    /**
     * Let's follow the native browser behavior for
     * scenarios where the input starts empty ("")
     */
    if (valueState.value === "") {
      /**
       * If `min` is set, native input, starts at the `min`.
       * Else, it starts at `step`
       */
      next = parse(step)
    } else {
      next = parse(valueState.value) + step
    }

    next = clamp(next)
    update(next)
  }

  const decrement = (step = stepProp) => {
    let next: string | number

    // Follow native implementation
    if (valueState.value === "") {
      next = parse(-step)
    } else {
      next = parse(valueState.value) - step
    }

    next = clamp(next)
    update(next)
  }

  const isOutOfRange = ref(false)

  const valueAsNumber = ref(0)

  watchEffect(() => {
    decimalPlaces.value = getDecimalPlaces(parse(valueState.value), stepProp)

    precision = precisionProp ?? decimalPlaces.value

    valueAsNumber.value = parse(valueState.value)

    isOutOfRange.value = valueAsNumber.value > max || valueAsNumber.value < min
  })

  return {
    decrement,
    increment,
    update,
    valueAsNumber,
    isOutOfRange,
    value: valueState,
  }
}

function parse(value: string | number) {
  return parseFloat(value.toString().replace(/[^\w.-]+/g, ""))
}

function getDecimalPlaces(value: number, step: number) {
  return Math.max(countDecimalPlaces(step), countDecimalPlaces(value))
}

function cast(value: string | number, step: number, precision?: number) {
  const parsedValue = parse(value)
  if (Number.isNaN(parsedValue)) return undefined

  const decimalPlaces = getDecimalPlaces(parsedValue, step)
  return toPrecision(parsedValue, precision ?? decimalPlaces)
}
