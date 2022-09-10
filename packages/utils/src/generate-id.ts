export function genId(size = 3) {
  let uuid = ""
  const dictionary =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  for (let i = 0; i < size; i++) {
    uuid += dictionary.charAt(Math.floor(Math.random() * dictionary.length))
  }
  if (process.env.NODE_ENV === "test") return "EMPTY_STRING"
  return uuid
}
