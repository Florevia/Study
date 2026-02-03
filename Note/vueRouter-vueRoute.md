# Vue Router 深度解析：router, useRouter, useRoute 的区别与使用场景

本文详细总结了 Vue 3 Router 中三个核心概念的区别，并明确了在不同场景下应该使用哪一种方式。

## 核心概念对比

| 概念            | 来源                                     | 类型        | 作用                                                                                       | 对应 Vue 2     |
| --------------- | ---------------------------------------- | ----------- | ------------------------------------------------------------------------------------------ | -------------- |
| **router**      | `src/router/index.js` (导出)             | Router 实例 | **全局路由控制器**。控制页面跳转、添加钩子、动态添加路由等。                               | `this.$router` |
| **useRouter()** | `import { useRouter } from 'vue-router'` | Hook 函数   | **组件内获取 Router 实例**。功能等同于上面的 `router`，但符合 Composition API 规范。       | `this.$router` |
| **useRoute()**  | `import { useRoute } from 'vue-router'`  | Hook 函数   | **当前路由状态对象**。包含当前 URL 的信息（path, query, params, meta）。**它是响应式的**。 | `this.$route`  |

---

## 底层原理

### `useRouter()` (路由操作 Hook)

这是一个专门为 Vue 组件设计的 Hook，它**只能在组件的 `setup()` 或 `<script setup>` 中调用**。

- **底层原理**: 它利用了 Vue 的 `provide/inject` 机制。在 `app.use(router)` 时，Vue Router 将 `router` 实例注入到了应用上下文中。`useRouter()` 本质上就是 `inject('router_key')`。
- **作用**: 获取 `router` 实例，用来执行 `router.push()`, `router.replace()`, `router.back()` 等操作。

### `useRoute()` (路由信息 Hook)

同样只能在组件中使用。它返回的是一个**响应式对象 (Reactive Object)**。

- **底层原理**: 当 URL 变化时，Vue Router 会更新内部的一个响应式变量，`useRoute()` 返回的就是这个变量的只读引用。
- **作用**: 获取当前页面的 `params` (路径参数), `query` (问号参数), `path`, `fullPath`, `meta` 等。
- **注意**: **永远不要解构** `useRoute()` 的返回值，否则会失去响应性！

  ```javascript
  const route = useRoute()
  // ❌ 错误：失去响应性，路由切换时 id 不会变
  const { id } = route.params

  // ✅ 正确：使用计算属性或直接通过 route 访问
  const id = computed(() => route.params.id)
  ```
