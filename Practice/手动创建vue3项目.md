# 不利用脚手架创建一个 vue3 项目

```bash
# 初始化项目，创建package.json
pnpm create vite@latest my-vue-app -- --template vue

# 下载前端框架和vite/webpack

pnpm add vue@next
pnpm add vite@latest --save-dev
# 或者
pnpm add webpack@latest --save-dev

# 下载vite/webpack的vue插件，让构建工具能够处理 .vue 文件
pnpm add @vitejs/plugin-vue@latest --save-dev
# 或者
pnpm add vue-loader@latest --save-dev

# 在vite.config.js中配置vue
# export default {plugins: [vue()]};


# 安装依赖
pnpm install

# 启动项目
pnpm run dev


```
