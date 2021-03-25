export const variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
  },
  leave: {
    opacity: 0,
  },
}

export const innerVariants = {
  initial: {
    scale: 0.9,
    opacity: 0,
  },
  enter: {
    scale: 1,
    opacity: 1,
    transition: {
      scale: {
        type: 'spring',
        damping: 5,
        stiffness: 550,
      },
    },
  },
  leave: {
    scale: 0.9,
    opacity: 0,
  },
}
