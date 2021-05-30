import docsSidebar from '@/config/docs-sidebar.json'
import guidesSidebar from '@/config/guides-sidebar.json'
import blogSidebar from '@/config/blog-sidebar.json'

export function getRoutes(slug: string) {
  // for home page, use docs sidebat
  if (slug === '/') return docsSidebar.routes

  const configMap = {
    '/resources': docsSidebar,
    '/changelog': docsSidebar,
    '/guides': guidesSidebar,
    '/blog': blogSidebar,
    '/docs': docsSidebar,
  }

  const [_path, sidebar] =
    Object.entries(configMap).find(([path, _sidebar]) =>
      slug.startsWith(path)
    ) ?? []

  return sidebar?.routes ?? []
}
