import { createWebHistory, createRouter, RouteRecordRaw, RouteRecordNormalized } from 'vue-router'

// @ts-expect-error
import _routes from 'pages-generated'
import { sentenceCase } from 'change-case'

const groupBy = (routes: any[], key: string) => routes.reduce((storage: any, item: any) => {
  const group = item[key];
  storage[group] = storage[group] || [];
  storage[group].push(item)
  return storage; 
}, {});

export default createRouter({
  history: createWebHistory(),
  routes: (_routes as RouteRecordRaw[]),
})

const groups = groupBy(_routes as RouteRecordRaw[], 'group')
const _routes_ = [{
  name: 'Home',
  path: '/',
  component: '../components/Home.vue',
}] as unknown[]

Object.keys(groups).forEach((group: string) => {
  _routes_.push({
    name: sentenceCase(group),
    path: `/c-${group}`,
    children: groups[group].map((route: any) => {
      const [_, name] = route.name.split('-examples-')
      return {
        ...route,
        name: sentenceCase(name),
      }
    })
  })
})

console.log(_routes_)

export const routes = _routes_