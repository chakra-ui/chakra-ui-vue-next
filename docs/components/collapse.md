# Collapse

The Collapse component is used to create regions of content that can
expand/collapse with a simple animation. It helps to hide content that's not
immediately relevant to the user.

This component leverages [`@vueuse/motion`](https://motion.vueuse.org/)

## Import

```js
import { CCollapse } from '@chakra-ui/vue-next';
```

## Usage

### Basic Usage

```vue
<template>
  <div>
    <c-button mb="4" variant-color="blue" @click="show = !show">
      Toggle
    </c-button>
    <c-collapse :is-open="show">
      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
      terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
      labore wes anderson cred nesciunt sapiente ea proident.
    </c-collapse>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  }
}
</script>
```

### Changing the startingHeight

```vue
<template>
  <div>
    <c-button mb="4" variant-color="blue" @click="show = !show">
      Show {{ show ? 'Less' : 'More' }}
    </c-button>
    <c-collapse :starting-height="20" :is-open="show">
      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
      terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
      labore wes anderson cred nesciunt sapiente ea proident.
    </c-collapse>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  }
}
</script>
```


## Props

This component doesn't have any custom props.

| Name             | Type      | Description                                                                                                  |
| ---------------- | --------- | ------------------------------------------------------------------------------------------------------------ |
| isOpen           | `boolean` | If `true`, the content will be visible                                                                       |
| animateOpacity   | `boolean` | If `true`, the opacity of the content will be animated                                                       |
| duration         | `number`  | The animation duration as it expands                                                                         |
| startingHeight   | `number`  | The height you want the content in it's collapsed state. Set to `0` by default                               |
| endingHeight     | `number`  | The height you want the content in it's expanded state. Set to `auto` by default                             |

## Events

| Name       | Payload   | Description                                                                                                  |
| ---------- | --------- | ------------------------------------------------------------------------------------------------------------ |
| `@entered`   | `Event`   | The event to be called when the collapse animation starts.                                                   |
| `@left`  | `Event`   | The event to be called when the collapse animation ends.                                                     |
