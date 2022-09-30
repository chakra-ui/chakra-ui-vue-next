# @chakra-ui/c-avatar

The avatar component is used to represent user and displays the profile picture initials or fallback icon

## Installation

```sh
yarn add @chakra-ui/c-avatar
# or
npm i @chakra-ui/c-avatar
```

## Imports

This packages exports the following components: 

- **CAvatar** : The image that represents the user.
- **CAvatarBadge** : A wrapper that displays its content on the right corner of the avatar.
- **CAvatarGroup** : A wrapper to stack multiple Avatars together.

## Usage 

### Default : 

```html
<c-avatar 
    name="Evan You" 
    alt="Evan You" 
    src="https://www.github.com/yyx990803.png" />
```

### Avatar Sizes : 

The avatar component comes in 7 different sizes (`2xs`|`xs` | `sm` | `md` | `lg` | `xl` | `2xl`) : 

```html
<c-avatar 
    name="Evan You" 
    alt="Evan You" 
    src="https://www.github.com/yyx990803.png" 
    size="sm"/>

```

### Avatar Fallbacks : 

If there is an error loading the `src` of the avatar, there are 2 fallbacks : 

- If there's a `name` prop, we use it to generate the initials and a random, accessible background color.
- If there's no `name` prop, we use a default Avatar.

### Customize the Fallback Avatar : 

You can customize the fallback Avatar either by using style props or by passing a custom icon. 

```html
 <!-- Styles props -->
<c-avatar size="md" bg="red.500" />

<!-- Custom default icon -->
<c-avatar>
    <c-icon color="white" name="star" />
</c-avatar>
```

### Avatar with badges

In some products, you might need to show a badge on the avatar. We call this a `badge`. 

The badge is by default on the bottom right corner, but you can change its position by using the prop `position` (`top-start` | `top-end` | `bottom-start` | `bottom-end`)

```html
<c-avatar name="Evan You">
    <c-avatar-badge bg="red.500" />
</c-avatar>
```

You can also add icons inside the badge if needed :

```html
<c-avatar name="Evan You">
    <c-avatar-badge bg="red.500">
        <c-icon color="white" name="minus" w="0.3em" />
    </c-avatar-badge>
</c-avatar>
```

### Avatar Group

In some cases, you might need to stack avatars as a group. Use the `CAvatarGroup` component.

- To limit the amount of avatars to show, use the `max` prop. It'll truncate the avatars and show a "+X" label (where X is the remaining avatars).
- To size all the avatars equally, pass the `size` prop.
- To adjust the spacing between the avatars, pass the `spacing` prop.


```html

<c-avatar-group max="3" size="lg">
    <c-avatar
        name="Sarah Drasner"
        src="https://avatars.githubusercontent.com/u/2281088?v=4"
        alt="Sarah Drasner"
    />
    <c-avatar
        name="Evan You"
        alt="Evan You"
        src="https://www.github.com/yyx990803.png"
    />
    <c-avatar
        name="Anthony Fu"
        src="https://avatars.githubusercontent.com/u/11247099?v=4"
        alt="Anthony Fu"
    />
    <c-avatar
        name="Maya Shavin"
        src="https://avatars.githubusercontent.com/u/6650139?v=4"
        alt="Maya Shavin"
    />
</c-avatar-group>

```

### Initials

We use a method that generate initials by splitting and merging the first character in each word from the `name` prop. But you can also pass the initials you want through the prop `initials`.