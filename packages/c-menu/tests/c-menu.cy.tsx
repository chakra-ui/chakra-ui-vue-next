/// <reference types="../../../@types" />
import * as Examples from "../examples"
import { h, Fragment, ref, defineComponent } from "vue"
import {
  CMenu,
  CMenuList,
  CMenuItem,
  CMenuTrigger,
  CMenuGroup,
  CMenuDivider,
  CSubMenuTrigger,
  CSubMenuList,
  CSubMenuItem,
  CSubMenu,
} from "../src"

describe("Menu Test suite", () => {
  it("has no accessibility violation", () => {
    Object.entries(Examples).map(([name, example]) => {
      it(`renders ${name} successfully`, () => {
        cy.mount(example.default).checkA11y()
      })
    })
  })

  it("opens correctly", () => {
    // Render
    cy.mount(() =>
      h(() => (
        <CMenu>
          <CMenuTrigger>Trigger</CMenuTrigger>
          <CMenuList>
            <CMenuItem>Add</CMenuItem>
            <CMenuItem>Remove</CMenuItem>
            <CMenuItem>Update</CMenuItem>
            <CMenuItem>Patch</CMenuItem>
          </CMenuList>
        </CMenu>
      ))
    )

    cy.contains("Add").should("not.be.visible")
    cy.contains("Remove").should("not.be.visible")
    cy.contains("Update").should("not.be.visible")
    cy.contains("Patch").should("not.be.visible")

    cy.contains("Trigger").click()

    cy.contains("Add").should("be.visible")
    cy.contains("Remove").should("be.visible")
    cy.contains("Update").should("be.visible")
    cy.contains("Patch").should("be.visible")
  })

  it("Selects the right option", () => {
    const Menu = defineComponent({
      setup(props, ctx) {
        const selected = ref("")
        return () => (
          <>
            <div>Selected: {selected.value}</div>
            <CMenu onSelect={(val) => (selected.value = val)}>
              <CMenuTrigger>Trigger</CMenuTrigger>
              <CMenuList>
                <CMenuItem>Add</CMenuItem>
                <CMenuItem>Remove</CMenuItem>
                <CMenuItem>Update</CMenuItem>
                <CMenuItem>Patch</CMenuItem>
              </CMenuList>
            </CMenu>
          </>
        )
      },
    })
    cy.mount(Menu)

    cy.contains("Selected: ").should("be.visible")
    cy.contains("Selected: Add").should("not.exist")
    cy.contains("Trigger").click()

    cy.contains("Add").click()

    cy.contains("Selected: Add").should("be.visible")
  })

  it("Select the right option when groups are used", () => {
    const Menu = defineComponent({
      setup() {
        const selected = ref("")
        return () => (
          <>
            <div>Selected: {selected.value}</div>
            <CMenu onSelect={(val) => (selected.value = val)}>
              <CMenuTrigger>Trigger</CMenuTrigger>
              <CMenuList>
                <CMenuGroup groupTitle="Actions">
                  <CMenuItem>Add</CMenuItem>
                  <CMenuItem>Remove</CMenuItem>
                  <CMenuItem>Update</CMenuItem>
                </CMenuGroup>
                <CMenuDivider data-testid="divider" />
                <CMenuGroup groupTitle="Social">
                  <CMenuItem>Discord</CMenuItem>
                  <CMenuItem>Twitter</CMenuItem>
                  <CMenuItem>Github</CMenuItem>
                </CMenuGroup>
              </CMenuList>
            </CMenu>
          </>
        )
      },
    })

    cy.mount(Menu)

    // Menu closed
    cy.get(".chakra-menu-group").contains("Actions").should("not.be.visible")
    cy.get(".chakra-menu-group").contains("Social").should("not.be.visible")

    // Menu open
    cy.contains("Trigger").click()
    cy.get("[data-testid='divider']").should("be.visible")
    cy.contains("Discord").click()
    cy.contains("Selected: Discord").should("be.visible")
    cy.contains("Trigger").click()
    cy.contains("Add").click()
    cy.contains("Selected: Add").should("be.visible")

    // Ensure menu is closed
    cy.contains("Discord").should("not.be.visible")
  })

  it("Works with controlled usage", () => {
    cy.mount(Examples.ControlledMenu)

    cy.contains("Trigger menu").click()

    cy.contains("Add").should("be.visible")
  })

  it("Works when selecting from a deep nested menu", () => {
    const Menu = defineComponent({
      setup(props, ctx) {
        const selected = ref("")
        return () => (
          <>
            <div>Selected: {selected.value}</div>
            <CMenu onSelect={(val) => (selected.value = val)}>
              <CMenuTrigger>Trigger</CMenuTrigger>
              <CMenuList>
                <CMenuItem>Add</CMenuItem>
                <CMenuItem>Remove</CMenuItem>
                <CMenuItem>Update</CMenuItem>
                <CSubMenu label="Nested">
                  <CSubMenuTrigger>Nested</CSubMenuTrigger>
                  <CSubMenuList>
                    <CSubMenuItem>Nested1</CSubMenuItem>
                    <CSubMenuItem>Nested12</CSubMenuItem>
                    <CSubMenu label="Double Nested">
                      <CSubMenuTrigger>Double Nested</CSubMenuTrigger>
                      <CSubMenuList>
                        <CSubMenuItem>Double Nested 1</CSubMenuItem>
                        <CSubMenuItem>Double Nested 2</CSubMenuItem>
                        <CSubMenu label="Triple Nested">
                          <CSubMenuTrigger>Triple Nested</CSubMenuTrigger>
                          <CSubMenuList>
                            <CSubMenuItem>Triple Nested 1</CSubMenuItem>
                            <CSubMenuItem>Triple Nested 2</CSubMenuItem>
                          </CSubMenuList>
                        </CSubMenu>
                      </CSubMenuList>
                    </CSubMenu>
                  </CSubMenuList>
                </CSubMenu>
              </CMenuList>
            </CMenu>
          </>
        )
      },
    })

    cy.mount(Menu)
    cy.contains("Trigger").click()
    cy.contains("Nested").trigger("click")
    cy.contains("Nested1").should("be.visible")
    cy.contains("Double Nested").trigger("click")
    cy.contains("Double Nested 1").should("be.visible")
    cy.contains("Triple Nested").trigger("click")
    cy.contains("Triple Nested 1").click()

    cy.contains("Selected: Triple Nested 1")
  })
})
