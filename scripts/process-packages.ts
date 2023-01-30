#!/usr/bin/env node

import consola from "consola"
import { readFileSync, ensureFile } from "fs-extra"
import { resolve } from "path"
import yargs from "yargs"
import { ensureFiles, runScript } from "./utils"

const logger = consola.withScope("processor")

yargs.scriptName("process-packages")
yargs.usage("$0 <cmd> [args]")

yargs.command(
  "process-packages [plugin]",
  "runs scrips to process packages",
  (args) => {
    args.array("plugin")
    args.boolean("pipe")
  },
  async (argv) => {
    console.log("Executing plugins:", argv.plugin, "to packages.")

    const shouldPipe = argv.pipe

    const plugins = argv.plugin as string[]
    const pluginPaths = plugins.map((p) =>
      resolve(__dirname, `./plugins/${p}.ts`)
    )
    await ensureFiles(pluginPaths)
    for (const plugin of pluginPaths) {
      await runScript(plugin)
    }

    logger.success("finished")
  }
)

yargs.help().argv
