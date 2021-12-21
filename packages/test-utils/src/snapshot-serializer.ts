// Adapted from `jest-serializer-vue`
// May be subject to changes due to Vue 3 core changes

const prettify = require("pretty")

const isHtmlString = (val: string) =>
  val && typeof val === "string" && val[0] === "<"

const isVueWrapper = (value: any) =>
  value &&
  typeof value === "object" &&
  typeof value.isVueInstance === "function"

const removeServerRenderedText = (html: string) =>
  html.replace(/ data-server-rendered="true"/, "")
// [-\w]+ will catch 1 or more instances of a-z, A-Z, 0-9, hyphen (-), or underscore (_)
const removeDataTestAttributes = (html: string) =>
  html.replace(/ data-test="[-\w]+"/g, "")

module.exports = {
  test(received: any) {
    return isHtmlString(received) || isVueWrapper(received)
  },
  print(received: any | string) {
    let html = (isVueWrapper(received) ? received.html() : received) || ""
    html = removeServerRenderedText(html)
    html = removeDataTestAttributes(html)
    return prettify(html, { indent_size: 2 })
  },
}
