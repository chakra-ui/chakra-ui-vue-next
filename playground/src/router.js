import { createWebHistory, createRouter, RouterView } from 'vue-router'
import lookup from './.generated/imports'
import generatedRoutes from './.generated/routes.json'

function buildRoutes(routes) {
  return routes.map(route => {
    const definition = {
      path: route.path,
      component: route.component ? lookup[route.component] : RouterView,
    }

    if (route.children) {
      definition.children = buildRoutes(route.children)
    }

    return definition
  })
}

const routes = buildRoutes(generatedRoutes)

console.group(routes)

export default createRouter({
  history: createWebHistory(),
  routes,
})
