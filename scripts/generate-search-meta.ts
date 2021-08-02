import { parseMarkdownFile, fileToPath, removePrefix } from '@docusaurus/utils'
import path from 'path'
//@ts-ignore
import toc from 'markdown-toc'
import { v4 as uuid } from 'uuid'
import shell from 'shelljs'
import fs from 'graceful-fs'
import prettier from 'prettier'

interface ResultType {
  content: string
  id: string
  url: string
  type: 'lvl1' | 'lvl2' | 'lvl3'
  hierarchy: {
    lvl1: string | null
    lvl2?: string | null
    lvl3?: string | null
  }
}

interface TOCResultItem {
  content: string
  slug: string
  lvl: 1 | 2 | 3
  i: number
  seen: number
}

const websiteRoot = 'website/src/pages'

async function getMDXMeta(file: string) {
  const { content, frontMatter } = await parseMarkdownFile(file)
  const tableOfContent = toc(content)
  const json = tableOfContent.json as TOCResultItem[]
  const slug = fileToPath(file)
    .replace(`/${websiteRoot}`, '')
    .replace(process.cwd(), '')

  const result: ResultType[] = []

  result.push({
    content: frontMatter.title as string,
    id: uuid(),
    type: 'lvl1',
    url: removePrefix(slug, '/'),
    hierarchy: {
      lvl1: frontMatter.title as string,
    },
  })

  json.forEach((item, index) => {
    result.push({
      content: item.content,
      id: uuid(),
      type: `lvl${item.lvl}` as any,
      url: `${removePrefix(slug, '/')}#${item.slug}`,
      hierarchy: {
        lvl1: frontMatter.title as string,
        lvl2: item.lvl === 2 ? item.content : json[index - 1]?.content ?? null,
        lvl3: item.lvl === 3 ? item.content : null,
      },
    })
  })

  return result
}

async function getSearchMeta() {
  let json: any = []

  const files = shell
    .ls('-R', websiteRoot)
    .map((file) => path.join(process.cwd(), websiteRoot, file))
    .filter((file) => file.endsWith('.mdx'))

  files.forEach(async (file) => {
    let result: any[] = []
    try {
      result = await getMDXMeta(file)
      json.push(...result)
    } catch (error) {
      /** do nothing */
    }
  })

  json = prettier.format(JSON.stringify(json), { parser: 'json' })
  const outPath = path.join(
    process.cwd(),
    'website/src/config',
    'search-meta.json'
  )
  fs.writeFileSync(outPath, json)
  console.log('Search meta is ready ✅')
}

getSearchMeta()
