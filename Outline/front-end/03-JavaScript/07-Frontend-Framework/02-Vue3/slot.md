# 插槽slot

它允许组件的父级在组件内部渲染自定义内容，而不是直接固定组件内部的 HTML。这使得组件能够更加灵活和可复用

## 分类

| 类型                     | 作用                          | 适用场景                              | 简单示例                          |
| ---------------------- | --------------------------- | --------------------------------- | ----------------------------- |
| **默认插槽（匿名插槽）**         | 子组件没有命名，默认指定一块区域插入内容        | 组件只有一个插入内容位置，如按钮文本、卡片内容区等         | `<slot></slot>`               |
| **具名插槽**               | 可为插槽指定 `name`，多块内容区由父组件分别传入 | 复杂模板结构如布局组件：header、footer、sidebar | `<slot name="header"></slot>` |
| **作用域插槽（Scoped Slot）** | 子组件向父组件暴露数据，由父组件决定如何渲染      | 列表渲染、复杂组件内部逻辑开放给使用方自定义            | `<slot :row="item"></slot>`   |

---
### 匿名插槽（默认插槽）

- 组件内部有一个 `<slot>` 元素，用于接收父级传递的内容。
- 父级在使用组件时，直接在组件标签内部写入内容，这些内容会被渲染到 `<slot>` 元素的位置。

```js
// 子组件child
<template>
  <div>
    <slot></slot>
  </div>
</template>

// 父组件
<template>
  <child>
    <p1>这是插槽的内容</p1>
  </child>
</template>
```

### 具名插槽

- 组件内部可以有多个 `<slot>` 元素，每个元素都有一个唯一的名称。
- 父级在使用组件时，可以通过 `<slot>` 元素的 `name` 属性指定要渲染的内容到哪个插槽。

```js
//子组件child
<template>
  <div>
    <slot name="header"></slot>
  </div>
  <div>
    <slot name="footer"></slot>
  </div>
  <slot></slot> // 默认插槽
</template>

// 父组件
<template>
  <child>
    <p1 slot="header">这是插槽header的内容</p1>
    <p2 slot="footer">这是插槽footer的内容</p2>
    <p3>这是默认插槽的内容</p3>
  </child>
</template>
```
### 作用域插槽 Scoped Slot

- 作用域插槽让父组件访问子组件的数据，不是简单内容插入，而是回调式渲染能力开放

```js
// 子组件child
<template>
  <div>
    <slot name="header" :message="message"></slot>
  </div>
</template>

// 父组件 - 写法1：使用props对象接收
<template>
  <child>
    <template #header="props">
      <p1>{{ props.message }}</p1>
    </template>
  </child>
</template>

// 父组件 - 写法2：直接解构接收
<template>
  <child>
    <template #header="{ message }">
      <p1>{{ message }}</p1>
    </template>
  </child>
</template>

// 父组件 - 写法3：解构并重命名
<template>
  <child>
    <template #header="{ message: msg }">
      <p1>{{ msg }}</p1>
    </template>
  </child>
</template>

```