# @chakra-ui/c-skip-nav

`CSkipNavLink` and `CSkipNavContent` are components in tandem to allow a user to skip over navigation content to some main content.

## Installation

```sh
yarn add @chakra-ui/c-skip-nav
# or
npm i @chakra-ui/c-skip-nav
```

Per WebAim.org on
[WCAG 2.4.1 (Bypass Blocks - Level A)](https://webaim.org/standards/wcag/checklist#sc2.4.1),
because the main content is not always the first section that the user
encounters on a page, it is strongly recommended to include a skip link for
users to be able to bypass content that is present on multiple pages. Navigation
links are the most common skipped.

> A user with a screen reader or specialized software could skip content via the
> headings or `main` region, but this is not sufficiant enough for sighted users
> who primarily use a keyboard.

## Imports

```sh
import { CSkipNavLink, CSkipNavContent } from '@chakra-ui/c-skip-nav'
```

## Usage

The `CSkipNavLink` component ideally needs to be one of the first items a user
encounters when they begin navigating a page after load. Therefore, it is
recommended to place it as high as possible in the app.

It renders an `a` tag and automatically creates a link with an `href` attribute
that will point to `CSkipNavContent`.

The `CSkipNavContent` component is used as a target for the link to place
keyboard focus on the first piece on main content. It renders a `div` and can
either be a self-closing component, or wrap the main content. (Visually, it
might be better to just wrap the main content so the visual focus outline is
very clear)

> You can supply a custom id value using the `id` prop but you will have to declare
> this prop and value in both components, or they will not match. For Example:
> `id="custom-id"` renders `href="#custom-id"` in `CSkipNavLink` and
> `id="custom-id"` in `CSkipNavContent`.

```tsx
<template>
  <c-skip-nav-link>Skip Navigation</c-skip-nav-link>
  // * Later in the page after the navigation...
  <c-skip-nav-content /> // Or it wraps the main content // Main content below
</template>
```
