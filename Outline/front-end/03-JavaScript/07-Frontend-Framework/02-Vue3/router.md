# Vue3 路由

## 安装

在 main.js 中引入并使用 vue-router(vue3)

```js
// 引入 vue-router 包
 import { createRouter, createWebHashHistory } from 'vue-router'
// 创建路由实例
 const router = createRouter({
  // 路由模式：hash 模式
   history: createWebHashHistory(),
   // 路由配置
   const routes = [
    // 重定向：访问根路径时，重定向到 /home
    {
      path: '/',              // 匹配根路径
      redirect: '/home'  // 重定向到 /home
    },
    // 首页路由
    {
      path: '/home',
      name: 'Home',
      component: () => import('../views/Home.vue'),
      // meta 自定义信息，用于路由守卫等场景
      meta: { title: '首页', auth: false }  
    },
    // 关于路由
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/About.vue'),
      // 子路由：关于的子路由
      children: [
        {
          path: '/about/child',
          name: 'AboutChild',
          component: () => import('../views/AboutChild.vue')
        }
      ]
    }
  ] 
 })
 // 导出路由实例
 export default router

 // 在 main.js 中挂载路由实例
 app.use(router)
```

## `<router-link>` 与 `<router-view>`

前端路由里最核心的两个组件

`<router-view>`：当前路由对应的“页面出口”，显示当前路由匹配到的组件。一般写在布局组件里。

```html
<template>
  <div id="app">
    <NavBar />
    <!-- 这里是“页面切换”的位置 -->
    <router-view />
  </div>
</template>
```

`<router-link>`：声明式导航链接，点击后会改变 URL，并触发路由切换

```html
<template>
  <div>
    <!-- 基本写法 -->
    <router-link to="/home">首页</router-link>
    <!--name + params：若使用 path 跳转，params 参数会被忽略，必须用 name 跳转，或直接在 path 中拼接参数 -->
    <!-- 在route配置里，需要用 :id 来占位 -->
    <router-link 
      :to="{ name: 'UserProfile', params: { id: 123 } }">用户 123</router-link>
     <!--name + query：可使用 path 或 name 跳转，传递 query 参数即可 -->
    <router-link 
      :to="{ name: 'Search', query: { keyword: 'vue' } }" active-class="active">
      <!-- active-class：点击后添加的类名，默认是 router-link-active -->
      搜索 vue
    </router-link>
  </div>
</template>
```   

## 路由跳转的两种方式

- 声明式导航：在模板里写 `<router-link>`

- 编程式导航：在脚本里使用 router.push()、router.replace() 等

### 常用 API

- router.push(location)：添加一条新历史记录。

- router.replace(location)：替换当前这条历史记录。

- router.back() / router.forward() / router.go(n)：控制浏览器历史栈前进后退。

### $route

```js
$route = {
  path: '/article/channel',        // 当前路径
  name: 'ArticleChannel',          // 路由名称
  params: {},                      // 路由参数
  query: {},                       // URL 查询参数
  hash: '',                        // URL hash
  fullPath: '/article/channel',    // 完整路径
  matched: [],                     // 匹配的路由记录
  meta: {}                         // 路由元信息
}
```
