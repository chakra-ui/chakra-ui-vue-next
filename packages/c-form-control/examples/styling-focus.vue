<template>
  <c-form-control id="first-name" w="400px">
    <c-form-label :_focus="{ color: 'blue.600' }"> First name </c-form-label>
    <c-input placeholder="First Name" />
    <c-form-error-message> Your first name is invalid </c-form-error-message>
  </c-form-control>
</template>
