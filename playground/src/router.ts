import { createWebHistory, createRouter, RouterView, RouteRecordRaw } from 'vue-router'
import lookup from './.generated/imports'
import generatedRoutes from './.generated/routes.json'

function buildRoutes(routes: Array<RouteRecordRaw>) : Array<RouteRecordRaw> {
  return routes.map((route: RouteRecordRaw) => {
    const definition: RouteRecordRaw = {
      path: route.path,
      component: route.component ? lookup[route.component] : RouterView,
      name: route.name
    }

    if (route.children) {
      definition.children = buildRoutes(route.children)
    }

    return definition
  })
}

export const routes = buildRoutes(generatedRoutes as Array<RouteRecordRaw>)

export default createRouter({
  history: createWebHistory(),
  routes,
})
