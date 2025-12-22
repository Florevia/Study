import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// @vitejs/plugin-vue 是一个插件，用于用于处理 .vue 单文件组件
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
});
