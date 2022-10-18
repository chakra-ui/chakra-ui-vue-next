# @chakra-ui/c-pin-input

The pin input component is similar to the input component but is optimized for entering sequences of digits quickly

## Installation

```sh
yarn add @chakra-ui/c-pin-input
# or
npm i @chakra-ui/c-pin-input
```

## Import

This package exports the following components : 

- **CPinInput** : The wrapper for all the field elements.
- **CPinInputField**: The field element.
- **CPinInputClearButton**: The button to clear all the fields.

## Usage :

### Basic : 

```html
<c-pin-input :value="['1', '2']">
    <c-pin-input-field />
    <c-pin-input-field />
    <c-pin-input-field />
    <c-pin-input-field />
</c-pin-input>
```

### Event handling : 

The `CPinInput` will trigger 3 events : 

- `change` : Whenever the value changes. It also returns the new value of the input as an array in an object. `{ value: [] }`
- `complete`: Trigger uppon completion of all the fields. Returns the value as an array, but also as a string. `{ value: [], valueAsString: '123' }`
- `invalid`: Triggers if the input is invalid.

```html
<c-pin-input @change="triggerChange" @complete="complete">
    <c-pin-input-field />
    <c-pin-input-field />
    <c-pin-input-field />
    <c-pin-input-field />
</c-pin-input>
```

### Props 

`value`: Value of the input (Type: `Array`).
`placeholder`: Changes the default placeholder (o)
`blurOnComplete`: To blur the last input when the user completes the input.
`type`: "alphanumeric" | "numeric"
`otp`: To trigger smartphone OTP suggestion.
`dir`: "rtl" | "ltr" . (Right-To-Left or Left-To-Right)
`spacing`: Space between the fields.
`mask` : Masks the value of the input by changing their type to "password"