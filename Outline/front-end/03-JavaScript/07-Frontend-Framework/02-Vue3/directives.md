# 自定义指令 directive

一个自定义指令由一个包含类似组件生命周期钩子的对象来定义

```js
// 全局注册
const app = createApp({})
app.directive('highlight', {
  mounted(el) {
    el.style.backgroundColor = 'yellow'
  }
})
```
```js
// 指令钩子
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode) {}
}
```


[自定义指令 | Vue.js](https://cn.vuejs.org/guide/reusability/custom-directives.html)