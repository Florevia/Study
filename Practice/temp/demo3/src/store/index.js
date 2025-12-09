 // 引入 createPinia 函数，用于创建 Pinia 实例
 import {createPinia} from "vue"
 // 引入 pinia-plugin-persistedstate 插件，用于持久化 Pinia 状态
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
 // 创建 Pinia 实例
 const pinia = createPinia()
// 配置 Pinia 实例使用持久化状态插件
pinia.use(piniaPluginPersistedstate)

//向外暴露pinia实例
export default pinia

//导入并向外暴露store模块
export * from "./modules/user.js" 
