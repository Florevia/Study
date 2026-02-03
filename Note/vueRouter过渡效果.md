# vueRouter 过渡效果

- Vue 的内置 `<Transition>` 组件配合 `<router-view>` 的 v-slot API

## 1. 基础用法（全局过度）

```vue
<template>
  <!-- 使用 v-slot 获取当前的组件 -->
  <router-view v-slot="{ Component }">
    <!-- 然后用 <Transition> 包裹该组件 -->
    <transition name="fade" mode="out-in">
      <!-- out-in：旧页面先消失，新页面再出现 -->
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
/* 定义淡入淡出动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
```

## 2. 进阶（基于路由的动态过渡）

- 不同的页面有不同的切换效果
- 通过路由的 meta 字段来实现

```js
// router/index.js
// 第一步：在路由配置中添加 meta 字段
const routes = [
  {
    path: "/",
    component: Home,
    meta: { transition: "fade" }, // 首页使用 fade
  },
  {
    path: "/about",
    component: About,
    meta: { transition: "slide-left" }, // 关于页使用 slide-left
  },
];
```

```js
// 第二步：在App.vue 中动态绑定 name
<template>
  <router-view v-slot="{ Component, route }">
    <!-- 动态绑定 name 属性 -->
    <!-- 如果路由没有定义 meta.transition，则回退到 'fade' -->
    <transition :name="route.meta.transition || 'fade'" mode="out-in">
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>
</template>

<style>
/* Slide Left 动画示例 */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease;
}
.slide-left-enter-from {
  transform: translateX(100%);
}
.slide-left-leave-to {
  transform: translateX(-100%);
}
</style>
```

## 高级用法（像原生 App 一样的“前进/后退”动画）

- 需要动态判断路由的层级或历史方向

```js
<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const transitionName = ref('fade')

// 监听路由变化，决定动画方向
watch(() => route.path, (to, from) => {
  // 简单的逻辑：根据路径深度判断
  // 实际项目中可能需要维护一个路由历史栈来实现更精准的判断
  const toDepth = to.split('/').length
  const fromDepth = from ? from.split('/').length : 0

  if (toDepth > fromDepth) {
    transitionName.value = 'slide-right' // 进入深层级 -> 右侧滑入
  } else if (toDepth < fromDepth) {
    transitionName.value = 'slide-left'  // 返回浅层级 -> 左侧滑出
  } else {
    transitionName.value = 'fade'        // 同层级 -> 淡入淡出
  }
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition :name="transitionName">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
/* 容器需要相对定位，防止动画时页面脱流 */
/* 这里的样式通常比较复杂，用于保证两个页面重叠时的绝对定位 */
</style>
```
