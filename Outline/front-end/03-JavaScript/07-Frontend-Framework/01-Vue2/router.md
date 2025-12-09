## 路由

URL（路径） -> 组件页面 的映射关系

## SPA（Single Page Application 单页应用）

基本原理：
1. 浏览器地址栏的 路径变化（/home -> /about）
2. 前端路由监听到变化
3. 根据配置好的 routes，找到对应的“路由记录”
4. 把 <router-view> 里当前展示的组件，切换为目标组件

## 安装

1. 安装 vue-router 包
   ```zsh
   npm install vue-router
   ```
2. 在 main.js 中引入并使用 vue-router(vue2)
   ```js
   import Vue from 'vue'
   import VueRouter from 'vue-router'

   Vue.use(VueRouter)
   ```


