import { sentenceCase } from 'change-case';
import { RouteRecordRaw } from 'vue-router';
import Home from './components/Home.vue'

export const groupBy = (routes: any[], key: string) => routes.reduce((storage: any, item: any) => {
  const group = item[key];
  storage[group] = storage[group] || [];
  storage[group].push(item)
  return storage; 
}, {});

export type ProcessableRoute = Omit<RouteRecordRaw, 'redirect'>

export const processRoutes = (routes: ProcessableRoute[]) => {
  const groups = groupBy(routes, 'group')
  const processedRoutes: ProcessableRoute[] = [{
    name: 'Home',
    path: '/',
    component: Home,
  }]

  Object.keys(groups).forEach((group: string) => {
    processedRoutes.push({
      name: sentenceCase(group),
      path: `/c-${group}`,
      children: groups[group].map((route: RouteRecordRaw) => {
        // @ts-expect-error
        const [_, name] = route?.name?.toString().split('-examples-')
        return {
          ...route,
          name: sentenceCase(name),
        }
      })
    })
  })

  return processedRoutes
}