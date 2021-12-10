import * as Examples from '../examples'
import { h } from 'vue'
// import { cy } from 'local-cypress'
import { CBreadcrumb, CBreadcrumbItem, CBreadcrumbLink } from '../src'
import { CIcon } from '../../c-icon/src'

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
      <CBreadcrumb data-testid="breadcrumb" {...props}>
        <CBreadcrumbItem>
          <CBreadcrumbLink href="/">Home</CBreadcrumbLink>
        </CBreadcrumbItem>

        <CBreadcrumbItem data-testid="with-separator">
          <CBreadcrumbLink href="/about">About</CBreadcrumbLink>
        </CBreadcrumbItem>

        <CBreadcrumbItem data-testid="current-page" isCurrentPage>
          <CBreadcrumbLink href="/contact">Contact</CBreadcrumbLink>
        </CBreadcrumbItem>
      </CBreadcrumb>
    ))
  )
}

describe('ARIA roles and attributes', () => {
  it('contains the correct role', () => {
    cy.mount(Examples.SimpleBreadcrumb.default)
      .get('[aria-label=breadcrumb]')
      .should('exist')
  })

  it('current page should have `aria-current="page"` attribute', () => {
    render()
      .get('[data-testid=current-page] > span')
      .should('have.attr', 'aria-current', 'page')
  })
})

it('renders its children', () => {
  render()
    .get('[data-testid=breadcrumb]')
    .should('contain', 'Home')
    .should('contain', 'About')
    .should('contain', 'Contact')
})

describe('Separator tests', () => {
  it('should display the accepted :separator prop', () => {
    render({ separator: '-' })
      .get('[data-testid=with-separator] > span')
      .should('contain', '-')
    render({ separator: '>' })
      .get('[data-testid=with-separator] > span')
      .should('contain', '>')
  })

  it('should not display separator for last child', () => {
    render({ separator: '-' })
      .get('[data-testid=breadcrumb] > ol > li')
      .last()
      .should('not.contain', '-')
  })

  it('should render separator as Functional component if provided', () => {
    const Sun = () => <CIcon data-testid="custom-separator" name="sun" />
    cy.mount(
      h(() => (
        <CBreadcrumb separator={Sun} data-testid="breadcrumb">
          <CBreadcrumbItem>
            <CBreadcrumbLink href="/">Home</CBreadcrumbLink>
          </CBreadcrumbItem>

          <CBreadcrumbItem data-testid="with-separator">
            <CBreadcrumbLink href="/about">About</CBreadcrumbLink>
          </CBreadcrumbItem>

          <CBreadcrumbItem data-testid="current-page" isCurrentPage>
            <CBreadcrumbLink href="/contact">Contact</CBreadcrumbLink>
          </CBreadcrumbItem>
        </CBreadcrumb>
      ))
    )
      .get('[data-testid=breadcrumb] > ol > li')
      .find('[data-testid=custom-separator]')
      .should('exist')
  })
})
