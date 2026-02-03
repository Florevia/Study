# main.js_import

```js
// 1.vue核心
import { createApp } from "vue"; // Vue 3 的应用创建函数
import App from "./App.vue"; // 根组件

// 2. 路由系统
import router from "./router/index.js";
createApp(App).use(router).mount("#app");

// 3. 状态管理
import store from "./store/index.js"; //Vuex
createApp(App).use(store).mount("#app");

import { createPinia } from "pinia"; //Pinia
createApp(App).use(createPinia()).mount("#app");

// 4.UI组件库（推荐按需引入）
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
createApp(App).use(ElementPlus).mount("#app");

// 5. 全局样式
import "./assets/styles/global.css"; // 全局 CSS
import "./assets/styles/reset.scss"; // 样式重置

// 6. 全局模块功能（自定义内容）
import "./icons"; // SVG 图标系统
import "./directives"; // 全局指令

// 7.全局组件注册
import "./components";
// 在 app 上注册
const app = createApp(App);
app.component("SvgIcon", SvgIcon);
```

## 相应的路由 router/index.js

```js
// 1. 导入依赖
import { createRouter, createWebHistory } from "vue-router";

// 2. 创建路由实例
export default const router = createRouter({
  history: createWebHistory(),
  routes: [],
});
```

## 相应的 store/index.js

```js
import { defineStore } from "pinia";
import { ref } from "vue";
// composition API
export default defineStore("main", {
    const name = ref("main");
    const sing = () => {
        console.log("I am singing");
    };
    return {
        name,
        sing,
    };
});
```

## 我的易混点

- createPinia() 是创建 Pinia 状态管理实例的函数
- 用于在 Vue 应用中安装和初始化 Pinia
- 必须在 main.js 中调用，才能让整个应用使用 Pinia

- defineStore() 是定义具体的 store 的函数
- 用于创建实际的状态仓库（state、getters、actions）
- 在 store 文件中使用，定义业务逻辑和数据
