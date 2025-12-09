# 插槽slot

它允许组件的父级在组件内部渲染自定义内容，而不是直接固定组件内部的 HTML。这使得组件能够更加灵活和可复用

## 分类

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
//解释：
// 子组件child内部有一个默认插槽<slot></slot>，父组件在使用子组件时，直接在子组件标签内部写入内容，这些内容会被渲染到子组件的默认插槽位置。
```

### 具名插槽

- 组件内部可以有多个 `<slot>` 元素，每个元素都有一个唯一的名称。
- 父级在使用组件时，可以通过 `<slot>` 元素的 `name` 属性指定要渲染的内容到哪个插槽。
- 父级可以在组件标签内部使用 `<template>` 元素，通过 `slot` 属性指定要渲染的插槽名称，然后在 `<template>` 元素内部写入内容，这些内容会被渲染到对应的插槽位置。

```js
//子组件child
<template>
  <div>
    <slot name="header"></slot>
  </div>
  <div>
    <slot name="footer"></slot>
  </div>
  <slot></slot>
</template>

// 父组件
<template>
  <child>
    <p1 slot="header">这是插槽header的内容</p1>
    <p2 slot="footer">这是插槽footer的内容</p2>
    <p3>这是默认插槽的内容</p3>
  </child>
</template>
//解释：
// 子组件child内部有三个插槽：header、footer和默认插槽。父组件在使用子组件时，通过slot属性指定要渲染的插槽名称，然后在插槽内部写入内容，这些内容会被渲染到对应的插槽位置。 
```
### 作用域插槽 Scoped Slot

- 组件内部可以定义一个 `<slot>` 元素，该元素可以接收父级传递的参数。
- 父级在使用组件时，可以通过 `<template>` 元素的 `slot-scope` 属性指定要渲染的内容到哪个插槽，并且可以在插槽内部使用传递的参数。


```js
// 子组件child
<template>
  <div>
    <slot name="header" :message="message"></slot>
  </div>
</template>
// 父组件
<template>
  <child>
    <template slot="header" slot-scope="props">
      <p1>{{ props.message }}</p1>
    </template>
  </child>
</template>
//解释：
// 子组件child内部有一个具名插槽header，该插槽接收一个参数message。父组件在使用子组件时，通过slot-scope属性指定要渲染的内容到header插槽，并且可以在插槽内部使用传递的参数message。
```