# vue2 响应式

## 原理&局限性

- 核心设计模式：观察者模式 (Observer Pattern)

- Vue 的响应式系统本质上是观察者模式的一种实现。整个系统主要由三个核心角色构成：

  - **Observer (观察者/数据劫持者)**: 负责拦截数据的读写操作。
  - **Dep (Dependency/依赖管理器)**: 负责维护依赖列表（即“谁依赖了这个数据”）。
  - **Watcher (订阅者)**: 负责在数据变化时执行具体的更新逻辑（如组件渲染函数）。

- 核心机制：

  - **数据劫持 (Data Interception)**
  - **依赖收集 (Dependency Collection)** —— Getter 阶段
  - **派发更新 (Change Notification)** —— Setter 阶段
  - **异步更新队列 (Asynchronous Update Queue)**

## 数据劫持

- vue2 在初始化（Initialization）阶段，会使用 `Object.defineProperty` 遍历 `data` 选项中的所有属性，并将其转换为 `Getter/Setter` (访问器属性)。

  - 无法检测对象属性的添加或删除：Object.defineProperty 只能劫持初始化时存在的属性。
  - 解决方案：Vue.set / Vue.delete

  - 数组下标修改无法检测，重写了 push, pop, splice 等 7 个数组变异方法来实现响应式。

- vue3 在初始化时，直接使用 `Proxy` 代理整个对象。

  - 全方位拦截：Proxy 可以拦截 13 种对象操作，包括属性读取、赋值、delete、in 操作符、Object.keys 等。这意味着属性的新增和删除也能被自动监听到，不再需要 Vue.set。

  - 懒处理（Lazy）：Vue 2 是初始化时全量递归；Vue 3 是只有访问到某个嵌套属性时，才会对该属性进行下一层的 reactive 转换。这大大提升了初始化性能。

  - 支持数组：Proxy 可以直接监听数组索引的变化和长度的变化。

## 依赖收集

Dep (Dependency) 和 Watcher (观察者)

当组件进行挂载（Mount）或渲染（Render）时，会触发数据的 Getter。

- 触发 Getter: 渲染函数（Render Function）读取数据属性。
- Dep.target: 此时，全局变量 Dep.target 指向当前正在执行的 Watcher（通常是组件的 Render Watcher）。
- 收集依赖: 属性的 Getter 将当前的 Watcher 添加到自己的 Dep（依赖列表）中。

## 派发更新

notify (通知) 和 re-render (重新渲染)

当数据被修改时，会触发数据的 Setter。

- 触发 Setter: 数据被赋予新值。
- 通知 Dep: Setter 调用该属性持有的 Dep 实例的 notify() 方法。
- 触发 Watcher: Dep 遍历其收集的所有 Watcher，并调用它们的 - update() 方法。

## 异步更新队列

Vue 的响应式更新是异步的。

## 工作流

初始化 (Init)
Vue 创建一个 Render Watcher 用于渲染该组件。
开启“依赖收集模式”（设置全局变量 Dep.target = currentWatcher）。
首次渲染 (Mount)
组件执行 render 函数。
代码读取了 this.message。
触发 message 的 Getter。
message 的 Dep 发现此时 Dep.target 有值，便把这个 Watcher 收集进去。
数据更新 (Update)
用户执行 this.message = 'New Value'。
触发 message 的 Setter。
message 的 Dep 遍历内部列表，通知刚才收集的 Render Watcher。
重新渲染 (Patch)
Watcher 收到通知，调用 update 方法。
组件重新执行 render 函数，生成新的 Virtual DOM。
利用 Diff 算法更新真实 DOM。
