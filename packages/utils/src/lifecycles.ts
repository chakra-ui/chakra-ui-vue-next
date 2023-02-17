import {
  getCurrentInstance,
  nextTick,
  onMounted,
  onBeforeMount,
  onBeforeUnmount,
  onUnmounted,
} from "vue"
import type { Fn } from "./types"

/**
 * Call onMounted() if it's inside a component lifecycle, if not, just call the function
 * This is useful when you want to call a function onMounted() but you don't know if it's
 * inside a component lifecycle or not
 *
 * Adapted from @vueuse/shared
 *
 * @param fn
 * @param sync if set to false, it will run in the nextTick() of Vue
 */
export function tryOnMounted(fn: Fn, sync = true) {
  if (getCurrentInstance()) onMounted(fn)
  else if (sync) fn()
  else nextTick(fn)
}

/**
 * Call onBeforeMount() if it's inside a component lifecycle, if not, just call the function
 *
 * @param fn
 * @param sync if set to false, it will run in the nextTick() of Vue
 */
export function tryOnBeforeMount(fn: Fn, sync = true) {
  if (getCurrentInstance()) onBeforeMount(fn)
  else if (sync) fn()
  else nextTick(fn)
}

/**
 * Call onBeforeUnmount() if it's inside a component lifecycle, if not, do nothing
 *
 * @param fn
 */
export function tryOnBeforeUnmount(fn: Fn) {
  if (getCurrentInstance()) onBeforeUnmount(fn)
}

/**
 * Call onUnmounted() if it's inside a component lifecycle, if not, do nothing
 *
 * @param fn
 */
export function tryOnUnmounted(fn: Fn) {
  if (getCurrentInstance()) onUnmounted(fn)
}
