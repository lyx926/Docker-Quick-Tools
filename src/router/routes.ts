const routes = [
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
    {
        path: '/nginx',
        name: 'nginx',
        component: () => import('@/views/tools/nginx.vue'),
        meta: {
            title: 'nginx',
        },
    },
    {
        path: '/jar',
        name: 'jar',
        component: () => import('@/views/tools/jar.vue'),
        meta: {
            title: 'jar',
        },
    },
    {
        path: '/mysql',
        name: 'mysql',
        component: () => import('@/views/tools/mysql.vue'),
        meta: {
            title: 'mysql',
        },
    },
    {
        path: '/redis',
        name: 'redis',
        component: () => import('@/views/tools/redis.vue'),
        meta: {
            title: 'redis',
        },
    },
]
export default routes;
