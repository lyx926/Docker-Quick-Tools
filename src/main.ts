import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import naive from 'naive-ui'
import router from '@/router'

// 全局样式
import '@/styles/var.less'
import '@/styles/mixin.less'
import '@/styles/global.less'

createApp(App)
  .use(createPinia()) // 启用 Pinia
  .use(naive) // naive-ui
  .use(router)
  .mount('#app')
