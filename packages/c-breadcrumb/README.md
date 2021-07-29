# @chakra-ui/c-breadcrumb

Breadcrumbs help users visualize their current location in relation to the rest of the website or application by showing the hierarchy of pages

## Installation

```sh
yarn add @chakra-ui/c-breadcrumb
# or
npm i @chakra-ui/c-breadcrumb
```



## Import components

Chakra UI Vue exports 3 breadcrumb related components:

- `CBreadcrumb`: The parent container for breadcrumbs.
- `CBreadcrumbItem`: Individual breadcrumb element containing a link and a
  divider.
- `CBreadcrumbLink`: The breadcrumb link.

```js
import { CBreadcrumb, CBreadcrumbItem, CBreadcrumbLink } from "@chakra-ui/vue-next"
```

## Usage

Add `isCurrentPage` prop to the `CBreadcrumbItem` that matches the current path.
When this prop is present, the `CBreadcrumbItem` doesn't have a separator, and
the `CBreadcrumbLink` has `aria-current` set to `page`.

```html
<c-breadcrumb>
  <c-breadcrumb-item>
    <c-breadcrumb-link href="#">Home</c-breadcrumb-link>
  </c-breadcrumb-item>

  <c-breadcrumb-item>
    <c-breadcrumb-link as="router-link" to="/docs">Docs</c-breadcrumb-link>
  </c-breadcrumb-item>

  <c-breadcrumb-item isCurrentPage>
    <c-breadcrumb-link>Help</c-breadcrumb-link>
  </c-breadcrumb-item>
</c-breadcrumb>
```

### Separators

Change the separator used in the breadcrumb by passing a string, like `-` element.

```html
<c-breadcrumb separator="-">
  <c-breadcrumb-item>
    <c-breadcrumb-link href="#">Home</c-breadcrumb-link>
  </c-breadcrumb-item>

  <c-breadcrumb-item>
    <c-breadcrumb-link as="router-link" to="/docs">Docs</c-breadcrumb-link>
  </c-breadcrumb-item>

  <c-breadcrumb-item isCurrentPage>
    <c-breadcrumb-link>Help</c-breadcrumb-link>
  </c-breadcrumb-item>
</c-breadcrumb>
```
### Using the separator slot

You can override the rendered spearator by using the `v-slot:separator` which will render any component you want as the separator for the `CBreadcrumb` component

```html
<c-breadcrumb>
  <template v-slot:separator>
    <c-icon name="chevron-right" />
  </template>
  <c-breadcrumb-item>
    <c-breadcrumb-link as="router-link" to="/">Home</c-breadcrumb-link>
  </c-breadcrumb-item>
  <c-breadcrumb-item>
    <c-breadcrumb-link href="#">Docs</c-breadcrumb-link>
  </c-breadcrumb-item>
  <c-breadcrumb-item is-current-page>
    <c-breadcrumb-link href="#">About</c-breadcrumb-link>
  </c-breadcrumb-item>
</c-breadcrumb>
```
### Using a functional icon component as the separator

You can also pass a functional component into the `:separator` prop

```html

<template>
  <c-breadcrumb :separator="SunIcon">
    <c-breadcrumb-item>
      <c-breadcrumb-link as="router-link" to="/">Home</c-breadcrumb-link>
    </c-breadcrumb-item>
    <c-breadcrumb-item>
      <c-breadcrumb-link href="#">Docs</c-breadcrumb-link>
    </c-breadcrumb-item>
    <c-breadcrumb-item is-current-page>
      <c-breadcrumb-link href="#">About</c-breadcrumb-link>
    </c-breadcrumb-item>
  </c-breadcrumb>
</template>

<script setup>
const SunIcon = () => {
  return h(CIcon, {
    name: 'sun',
  })
}
</script>

```
