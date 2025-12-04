# vue2中 v-model是如何实现双向绑定的？

## v-model 在原生表单上的实现

```js
//1.
<input v-model="msg">
//编译后等价于
<input 
  :value="msg" 
  @input="msg = $event.target.value"
/>

//2.
//checkbox + 数组（选中项列表）
<input 
  type="checkbox" 
  v-model="list" 
  value="A"
/>
<input 
  type="checkbox" 
  v-model="list" 
  value="B"

  @change="(e) => {
  const checked = e.target.checked
  const val = 'A'
  const arr = list
  //选中时：往 list 里 push(value)
  if (checked && arr.indexOf(val) < 0) arr.push(val)
  //取消时：从 list 中移除该 value
  if (!checked && arr.indexOf(val) > -1) arr.splice(arr.indexOf(val), 1)
}"

/>

```

## 组件中的 v-model 是怎么实现的？

父：v-model → 传 prop + 监听 event
子：通过 props 接收 + 通过 emit 往外发更新事件

```js
//父组件
<MyInput v-model="msg" />
//等价于
<MyInput
  :value="msg"
  @input="msg = $event"
/>

//子组件
<input :value="value" @input="onInput">

export default {
  props: {
    value: String
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)
    }
  }
}
```

## vue2 数据更新原理

```js
//Vue2 会在初始化阶段，对 data 里的每一个 key 做：

Object.defineProperty(data, 'msg', {
  get() {
    // 依赖收集：谁在用我，就把谁记录下来
    dep.depend()
    return value
  },
  set(newVal) {
    if (newVal !== value) {
      value = newVal
      // 通知所有 watcher：我变了，你们要更新
      dep.notify()
    }
  }
})
```

## 面试总结

1. 在 Vue2 中，v-model 本质是 :value 加上 @input（或 @change）的语法糖。
2. 对于原生表单，会根据不同类型自动生成对应的 value/checked 绑定和事件处理逻辑；对于组件，则会转成一个 prop 和一个事件，默认是 value 和 input，也可以通过组件的 model 选项自定义。
3. 底层的数据响应是通过 Object.defineProperty 劫持 data 属性的 getter/setter，再结合依赖收集（Dep）和 watcher 实现 data → view 的更新；而 @input / @change 回调里把 DOM 的值写回 data，就实现了 view → data 的更新，两者组合在一起，就形成了我们看到的“v-model 双向绑定”。