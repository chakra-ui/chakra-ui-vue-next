import { ensureFile } from "fs-extra"
import { resolve } from "path"

export async function ensureFiles(paths: string[]) {
  for (const plugin of paths) {
    try {
      await ensureFile(resolve(plugin))
    } catch (error) {
      console.error("Unable to locate plugin ", plugin, " in plugins directory")
    }
  }
}
