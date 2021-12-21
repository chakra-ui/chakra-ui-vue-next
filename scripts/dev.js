const ChakraComponents = require("@chakra-ui/vue-next")
const { writeFileSync } = require("fs")
const { resolve } = require("path")

async function main() {
  const components = {}
  for (const prop in ChakraComponents) {
    if (prop.startsWith("C")) {
      components[prop] = ChakraComponents[prop]
    }
  }

  writeFileSync(
    resolve(__dirname, "../build/components.json"),
    JSON.stringify(components, null, 2),
    { encoding: "utf8" }
  )
}

main()
  .then(() => console.log("Successfully generated components build"))
  .catch((error) => console.error("Error generating components", error))
