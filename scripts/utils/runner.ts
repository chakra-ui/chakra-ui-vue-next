#!/usr/bin/env node

import { execa } from "execa"

export async function runScript(scriptPath: string) {
  console.log("executing plugin::", scriptPath)
  try {
    const { stdout } = await execa(`pnpm`, ["jiti", scriptPath])
    console.info("stdout", stdout)
  } catch (error) {
    console.error(error)
  }
}
