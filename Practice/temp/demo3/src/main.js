// 引入createApp函数，用于创建 Vue 应用实例
import { createApp } from 'vue'
// 引入全局样式文件
import './style.css'
// 引入根组件 App.vue
import App from './App.vue'
import router from "./router/index.js"
// 创建 Vue 应用实例
const app = createApp() 
// 使用路由模块，挂载 Vue 应用实例到 DOM 元素 #app 上
app.use(router).mount('#app')
