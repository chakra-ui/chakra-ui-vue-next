export const getTheme = (
  outerTheme: Object,
  theme: object | ((Obj: object) => Object)
) => {
  if (typeof theme === "function") {
    const mergedTheme = theme(outerTheme)
    if (
      process.env.NODE_ENV !== "production" &&
      (mergedTheme == null ||
        typeof mergedTheme !== "object" ||
        Array.isArray(mergedTheme))
    ) {
      throw new Error(
        "[EmotionThemeProvider] Please return an object from your theme function, i.e. theme={() => ({})}!"
      )
    }
    return mergedTheme
  }
  if (
    process.env.NODE_ENV !== "production" &&
    (theme == null || typeof theme !== "object" || Array.isArray(theme))
  ) {
    throw new Error(
      "[EmotionThemeProvider] Please make your theme prop a plain object"
    )
  }

  return { ...outerTheme, ...theme }
}
