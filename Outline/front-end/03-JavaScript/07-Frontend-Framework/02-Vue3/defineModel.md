# defineModel() 宏

vue3中更推荐的双向绑定方式，返回一个ref，可以像其他 ref 一样被访问以及修改，不过它能起到在父组件和当前变量之间的双向绑定的作用：它的 .value 和父组件的 v-model 的值同步。

```js
//父组件
<script setup>
const msg = ref('Hello')
</script>

<template>
  <div>
    <child
      v-model="msg" 
    />
  </div>
  <h2>{{ msg}}</h2>
</template>
```
```js
//子组件
<script setup>
  // 定义 model 变量，绑定 modelValue 属性
const model = defineModel()
</script>

<template>
  <div>
    <input
      v-model="model"
    />
  </div>
</template>

```

## 底层机制

一个名为 modelValue 的 prop，本地 ref 的值与其同步；

一个名为 update:modelValue 的事件，当本地 ref 的值发生变更时触发。


官方文档：[defineModel() 宏](https://vuejs.org/api/sfc-script-setup.html#definemodel)

