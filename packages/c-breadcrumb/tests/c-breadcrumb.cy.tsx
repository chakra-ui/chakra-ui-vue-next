import * as Examples from '../examples'
import { h } from 'vue'
// import { cy } from 'local-cypress'
import { CBreadcrumb, CBreadcrumbItem, CBreadcrumbLink } from '../src'

describe('Breadcrumb Examples', () => {
  Object.entries(Examples).map(([name, example]: any) => {
    it(`renders ${name} successfully`, () => {
      cy.mount(h(() => <example.default></example.default>)).checkA11y()
    })
  })
})

const render = (props: any = {}) => {
  return cy.mount(
    h(() => (
      <CBreadcrumb data-testid="breadcrumb" separator="-" {...props}>
        <CBreadcrumbItem>
          <CBreadcrumbLink href="/">Home</CBreadcrumbLink>
        </CBreadcrumbItem>

        <CBreadcrumbItem>
          <CBreadcrumbLink href="/about">About</CBreadcrumbLink>
        </CBreadcrumbItem>

        <CBreadcrumbItem data-testid="current-page" isCurrentPage>
          <CBreadcrumbLink href="/contact">Contact</CBreadcrumbLink>
        </CBreadcrumbItem>
      </CBreadcrumb>
    ))
  )
}

it('contains the correct role', () => {
  cy.mount(Examples.SimpleBreadcrumb.default).get('[aria-label=breadcrumb]').should('exist')
})

it('renders its children', () => {
  render()
    .get('[data-testid=breadcrumb]')
    .should('contain', 'Home')
    .should('contain', 'About')
    .should('contain', 'Contact')  
})

it('current page should have `aria-current="page"` attribute', () => {
  render()
    .get('[data-testid=current-page] > span')
    .should('have.attr', 'aria-current', 'page') 
})
