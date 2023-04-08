import type { RouteRecordRaw } from 'vue-router'

/**
 * 路由配置
 * @description 所有路由都在这里集中管理
 */
const routes: RouteRecordRaw[] = [
  /**
   * 首页
   */
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home.vue'),
    meta: {
      title: 'Home',
    },
  },
  /**
   * 子路由示例
   */
  {
    path: '/foo',
    name: 'foo',
    component: () => import('@/components/TransferStation.vue'),
    meta: {
      title: 'Foo',
    },
    redirect: {
      name: 'bar',
    },
    children: [
      {
        path: 'bar',
        name: 'bar',
        component: () => import('@/views/foo/bar.vue'),
        meta: {
          title: 'Bar',
        },
      },
    ],
  },
  {
    path: '/Nginx',
    name: 'Nginx',
    component: () => import('@/views/foo/Nginx.vue'),
    meta: {
      title: 'Nginx',
    },
  },
  {
    path: '/Jar',
    name: 'Jar',
    component: () => import('@/views/foo/Jar.vue'),
    meta: {
      title: 'Jar',
    },
  },
  {
    path: '/Mysql',
    name: 'Mysql',
    component: () => import('@/views/foo/Mysql.vue'),
    meta: {
      title: 'Mysql',
    },
  },
  {
    path: '/Redis',
    name: 'Redis',
    component: () => import('@/views/foo/Redis.vue'),
    meta: {
      title: 'Redis',
    },
  },
]

export default routes
