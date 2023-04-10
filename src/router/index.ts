import {createRouter, createWebHistory} from "vue-router"
import routes from "./routes"

// 创建路由
const router = createRouter({
    // 在这里传入项目打包目录
    history: createWebHistory('/docker/'),
    // history: createWebHistory(),
    routes
});
export default router
