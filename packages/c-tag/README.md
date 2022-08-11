# @chakra-ui/c-tag

Tag component is used for items that need to be labeled, categorized, or organized using keywords that describe them.

## Installation

```sh
yarn add @chakra-ui/c-tag
# or
npm i @chakra-ui/c-tag

```

## Import

This package exports the following components :

- **CTag** : The wrapper for all the tag elements.
- **CTagLabel** : The label for tag's text content.
- **CTagRightIcon** : The icon placed on the left side of the tag.
- **CTagLeftIcon** : The icon placed on the right side of the tag.
- **CTagCloseButton** : The close button for the tag.

## Usage

### Sample Tag :

```html
<c-tag>Sample Tag</c-tag>
```

### With custom attributes :

```html
<c-tag size="md" variant="solid" color-scheme="teal">Sample Tag</c-tag>
```

### With left icon

```html
<c-tag
  ><c-tag-left-icon name="add" /><c-tag-label>Sample Tag</c-tag-label></c-tag
>
```

### With right icon

```html
<c-tag
  ><c-tag-label>Sample Tag</c-tag-label><c-tag-right-icon name="check"
/></c-tag>
```

### With close button

```html
<c-tag><c-tag-label>Sample Tag</c-tag-label><c-tag-close-button /></c-tag>
```

### With custom element

```html
<c-tag><my-custom-element /><c-tag-label>Sample Tag</c-tag-label></c-tag>
```

### Props 

`variant` : "subtle" | "solid" | "outline" 
`colorScheme`: "whiteAlpha" | "blackAlpha" | "gray" | "red" | "orange" | "yellow" | "green" | "teal" | "blue" | "cyan" | "purple" | "pink" | "linkedin" | "facebook" | "messenger" | "whatsapp" | "twitter" | "telegram" | any color scheme added to the theme
`size`: "sm" | "md" | "lg"
