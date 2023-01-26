<template>
  <div>
    <div :class="styles.root">
      Nuxt module playground!
    </div>
    <button :class="styles.button">
      Hello World
    </button>
  </div>
</template>

<script lang="ts" setup>
import { css } from '@emotion/css'

const styles = reactive({
  root: css({
    paddingInline: '16px',
    paddingBlock: '12px',
    fontSize: '1rem',
    fontFamily: 'system ui',
    color: 'white',
    borderRadius: '20px',
    backgroundColor: 'indigo'
  }),
  button: css({
    padding: '13px 18px',
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'pre',
    borderRadius: '9999px',
    borderWidth: '2px',
    borderColor: 'transparent',
    backgroundColor: 'rgb(245 245 240)',
    fontSize: '15px',
    fontWeight: '400',
    lineHeight: '21px',
    letterSpacing: '.011em',
    cursor: 'pointer',
    transitionProperty:
      'color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter',
    transitionTimingFunction: 'cubic-bezier(.4,0,.2,1)',
    transitionDuration: '.15s',
    '&:hover': {
      backgroundColor: 'rgb(79 77 77)',
      color: 'rgb(245 245 240)'
    }
  })
})
</script>
