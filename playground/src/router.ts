import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'
import _routes from 'pages-generated'
import { ProcessableRoute, processRoutes } from './utils';

export const routes = processRoutes(_routes as ProcessableRoute[])

const router = createRouter({
  history: createWebHistory(),
  routes: (_routes as RouteRecordRaw[]),
})

export default router