import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 自动引入 Element Plus 组件库的相关代码
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    // 自动引入 Element Plus 组件库的相关代码
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
