import fs from 'fs'
import p from 'path'

function recursiveReaddirSync(path: string) {
  let list: string[] = []
  const files = fs.readdirSync(path)
  let stats

  files.forEach(function (file) {
    stats = fs.lstatSync(p.join(path, file))
    if (stats.isDirectory()) {
      list = list.concat(recursiveReaddirSync(p.join(path, file)))
    } else {
      list.push(p.join(path, file))
    }
  })

  return list
}

export default recursiveReaddirSync
