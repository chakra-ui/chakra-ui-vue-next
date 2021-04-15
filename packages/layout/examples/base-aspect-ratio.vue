<template>
  <chakra.div py="4">
    <chakra.div py="4">
      <c-aspect-ratio maxW="360px" :ratio="16 / 9" mb="4">
        <img src="https://bit.ly/naruto-sage" alt="img" />
      </c-aspect-ratio>

      <c-aspect-ratio maxW="560px" :ratio="1">
        <iframe
          title="naruto"
          src="https://www.youtube.com/embed/QhBnZ6NPOY0"
          allowFullScreen
        />
      </c-aspect-ratio>
    </chakra.div>
  </chakra.div>
</template>
<script setup></script>
