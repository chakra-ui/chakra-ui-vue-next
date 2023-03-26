/**
 * The purpose of this useDescendant is to provide a way to register a descendant
 * component and provide it with a unique index. This is useful for things like
 * accordions, tabs, or any other type of list where only one item can be active
 * at a time.
 */

/**
 * Create a class that can be used to register descendants with a parent
 * component.
 */

import { createContext, genId } from "@chakra-ui/vue-utils"
import { customRef, triggerRef } from "vue"

export class DescendantAuthority {
  constructor(id: symbol) {
    this.descendants = []
    this.id = id
  }

  descendants: Descendant[]
  id: symbol

  register(descendant: Descendant) {
    this.descendants.push(descendant)
    return descendant.id
  }

  unregister(id: string) {
    this.descendants = this.descendants.filter(
      (descendant) => descendant.id !== id
    )
  }

  isRegistered(id: string) {
    return this.descendants.some((descendant) => descendant.id === id)
  }

  getDescendants() {
    return this.descendants
  }

  getDescendantById(id: string) {
    return this.descendants.find((descendant) => descendant.id === id)
  }

  json() {
    const payload = {
      id: this.id,
      descendants: this.descendants.map((descendant) => ({
        id: descendant.id,
        authorityId: descendant.authorityId,
      })),
    }
    return payload
  }
}

const descendantManagerStore = new Map()

export class Descendant {
  constructor({
    id,
    authority,
  }: {
    id: string
    authority: DescendantAuthority
  }) {
    this.id = id
    this.authorityId = authority.id
  }

  id: string
  authorityId: symbol
}

function createDescendantAuthority(id: symbol) {
  const descendantManager = new DescendantAuthority(id)
  descendantManagerStore.set(id, descendantManager)
  return descendantManager
}

function createDescendant(id: string, authority: DescendantAuthority) {
  return new Descendant({ id, authority })
}

function storeDescendant(descendant: Descendant) {
  const { id, authorityId } = descendant
  const authority = descendantManagerStore.get(authorityId)
  if (authority.isRegistered(id)) {
    throw new Error(`Descendant with id ${id} is already registered.`)
  }
  return authority.register(descendant)
}

export function createDescendantRegister(id: string) {
  let __descendantAuthority__ = createDescendantAuthority(Symbol(id))
  const descendantAuthority = customRef((track, trigger) => ({
    get() {
      track()
      return __descendantAuthority__
    },
    set(value) {
      __descendantAuthority__ = value
      trigger()
    },
  }))

  const [DescendantAuthorityProvider, useAuthority] =
    createContext<DescendantAuthority>(
      {
        name: id,
        strict: false,
      },
      __descendantAuthority__
    )

  function registerAuthority() {
    DescendantAuthorityProvider(__descendantAuthority__)
  }

  function registerDescendant(id: string) {
    const descendant = createDescendant(id, __descendantAuthority__)
    storeDescendant(descendant)
    triggerRef(descendantAuthority)
    return descendant
  }

  return [
    registerAuthority,
    registerDescendant,
    useAuthority,
    descendantAuthority,
  ] as const
}
